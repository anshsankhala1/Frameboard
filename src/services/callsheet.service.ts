import Anthropic from '@anthropic-ai/sdk';
import type { CallSheetInput, GeneratedCallSheet } from '../types/callsheet';
import { SearchService } from './search.service';
import { ExcelGeneratorService } from './excel-generator.service';

export class CallSheetService {
  /**
   * Generate a comprehensive call sheet using Claude API + Web Search + Excel
   */
  static async generateCallSheet(input: CallSheetInput): Promise<GeneratedCallSheet> {
    try {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      console.log('API Key in service:', apiKey ? `${apiKey.substring(0, 20)}...` : 'UNDEFINED');

      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is not set');
      }

      // Step 1: Analyze script with Claude to extract scenes, characters, equipment needs
      const anthropic = new Anthropic({ apiKey });
      console.log('Step 1: Analyzing script with Claude...');

      const analysisPrompt = this.buildScriptAnalysisPrompt(input);
      const analysisMessage = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 6000,
        messages: [{ role: 'user', content: analysisPrompt }],
      });

      const analysisText = analysisMessage.content[0].type === 'text'
        ? analysisMessage.content[0].text
        : '';

      // Parse the analysis to get structured data
      let analysisData: any = {};
      try {
        // Try to extract JSON from Claude's response
        console.log('Raw analysis response length:', analysisText.length);

        // First try: Look for JSON in code blocks
        let jsonText = '';
        const codeBlockMatch = analysisText.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
        if (codeBlockMatch) {
          jsonText = codeBlockMatch[1];
        } else {
          // Second try: Look for raw JSON object
          const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonText = jsonMatch[0];
          }
        }

        if (jsonText) {
          // Clean up common JSON issues while preserving string content
          jsonText = jsonText
            .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
            .trim();

          console.log('Attempting to parse JSON, first 500 chars:', jsonText.substring(0, 500));

          try {
            analysisData = JSON.parse(jsonText);
            console.log('Successfully parsed JSON');
          } catch (parseError) {
            // If initial parse fails, try more aggressive cleaning
            console.log('First parse failed, trying aggressive cleaning...');
            const cleanedJson = jsonText
              .replace(/[\n\r\t]/g, ' ') // Remove all whitespace chars
              .replace(/\s+/g, ' ') // Normalize spaces
              .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas again

            analysisData = JSON.parse(cleanedJson);
            console.log('Successfully parsed JSON after cleaning');
          }
        } else {
          console.error('No JSON found in response');
        }
      } catch (e) {
        console.error('Error parsing analysis JSON:', e);
        console.error('Failed JSON text (first 1000 chars):', analysisText.substring(0, 1000));
        // Use empty data as fallback
        analysisData = { scenes: [], characters: [], equipment: [] };
      }

      console.log('Script analysis complete. Found:', {
        scenes: analysisData.scenes?.length || 0,
        characters: analysisData.characters?.length || 0,
        equipment: analysisData.equipment?.length || 0,
      });

      // Step 2: Search for real filming locations for each scene
      console.log('Step 2: Searching for real filming locations...');
      if (analysisData.scenes && analysisData.scenes.length > 0) {
        const locationPromises = analysisData.scenes.slice(0, 5).map(async (scene: any) => {
          const locations = await SearchService.findFilmingLocations(
            scene.description || '',
            scene.location || '',
            input.generalLocation
          );
          return {
            sceneLocation: scene.location,
            sceneNumber: scene.sceneNumber,
            suggestions: locations,
          };
        });

        const locationResults = await Promise.all(locationPromises);
        analysisData.locationSuggestions = locationResults;

        // Add suggested location to each scene
        analysisData.scenes = analysisData.scenes.map((scene: any) => {
          const locationMatch = locationResults.find(
            (loc) => loc.sceneNumber === scene.sceneNumber
          );
          if (locationMatch && locationMatch.suggestions.length > 0) {
            scene.suggestedLocation = locationMatch.suggestions[0].venueName +
              ' - ' + locationMatch.suggestions[0].address;
          }
          return scene;
        });
      }

      // Step 3: Search for actors on casting platforms
      console.log('Step 3: Finding budget-friendly casting suggestions...');
      if (analysisData.characters && analysisData.characters.length > 0) {
        const castingPromises = analysisData.characters.slice(0, 5).map(async (char: any) => {
          const castingSuggestions = await SearchService.findActors(
            char.name || char.character || '',
            char.description || '',
            input.generalLocation,
            input.budget // Pass budget for filtering
          );
          return {
            character: char.name || char.character,
            description: char.description,
            callTime: char.callTime || input.generalCallTime,
            makeup: char.makeup || 'Standard',
            wardrobe: char.wardrobe || 'See costume designer',
            onSet: char.onSet || 'TBD',
            notes: char.notes || '',
            castingType: castingSuggestions[0]?.castingType || '',
            suggestedActors: castingSuggestions[0]?.suggestedActors || 'Search on Backstage',
            platform: castingSuggestions[0]?.platform || 'Backstage / Actors Access',
          };
        });

        analysisData.cast = await Promise.all(castingPromises);
      }

      // Step 4: Search for equipment rental companies
      console.log('Step 4: Finding equipment rental companies...');
      if (analysisData.equipment && analysisData.equipment.length > 0) {
        const equipmentWithRentals = await Promise.all(
          analysisData.equipment.slice(0, 10).map(async (equip: any) => {
            const rentalInfo = await SearchService.findEquipmentRentals(
              equip.category || equip.item || '',
              input.generalLocation
            );
            return {
              ...equip,
              rentalCompany: rentalInfo.rentalCompany || 'Local rental house',
              contact: rentalInfo.contact || 'TBD',
              cost: rentalInfo.estimatedCost || equip.cost || 'Quote needed',
            };
          })
        );
        analysisData.equipment = equipmentWithRentals;
      }

      // Step 5: Flatten location suggestions for Excel
      const locationsForExcel: any[] = [];
      if (analysisData.locationSuggestions) {
        analysisData.locationSuggestions.forEach((locGroup: any) => {
          if (locGroup.suggestions && locGroup.suggestions.length > 0) {
            locGroup.suggestions.forEach((loc: any) => {
              locationsForExcel.push({
                sceneLocation: locGroup.sceneLocation,
                venueName: loc.venueName,
                address: loc.address,
                matchReason: loc.matchReason,
                distance: loc.distance,
                permitCost: loc.permitCost,
                contact: loc.contact,
                accessibility: loc.accessibility,
                parking: loc.notes || '',
                notes: '',
              });
            });
          }
        });
      }
      analysisData.locations = locationsForExcel;

      // Step 6: Generate Excel file
      console.log('Step 5: Generating Excel call sheet...');
      const excelBuffer = await ExcelGeneratorService.generateCallSheetExcel(
        input,
        analysisData
      );

      const callSheet: GeneratedCallSheet = {
        id: `cs-${Date.now()}`,
        input,
        generatedContent: `Call sheet generated with ${analysisData.scenes?.length || 0} scenes, ${analysisData.cast?.length || 0} characters, ${analysisData.equipment?.length || 0} equipment items`,
        generatedAt: new Date(),
        format: 'excel',
        excelData: excelBuffer.toString('base64'), // Store as base64 for transmission
      };

      console.log('Call sheet generation complete!');
      return callSheet;
    } catch (error) {
      console.error('Error generating call sheet:', error);
      throw new Error('Failed to generate call sheet');
    }
  }

  /**
   * Build script analysis prompt for Claude
   */
  private static buildScriptAnalysisPrompt(input: CallSheetInput): string {
    const { script, budget, generalLocation } = input;

    return `You are a professional Assistant Director analyzing a film script.

SCRIPT:
${script}

PRODUCTION INFO:
- Budget: ${budget ? `$${budget.toLocaleString()}` : 'TBD'}
- Filming Location: ${generalLocation}

TASK: Analyze this script and extract production information. Return ONLY valid JSON, no other text.

CRITICAL: Your response must be ONLY the JSON object below. Do not include explanations, markdown, or code blocks. Just raw JSON.

{
  "scenes": [
    {
      "sceneNumber": "1",
      "pages": "2/8",
      "intExt": "INT",
      "location": "COFFEE SHOP",
      "dayNight": "DAY",
      "description": "Two friends meet",
      "cast": "Alice, Bob",
      "crewNeeded": "Camera, Sound",
      "equipment": "DSLR camera"
    }
  ],
  "characters": [
    {
      "character": "Alice",
      "description": "Female 25-30",
      "scenes": "1, 3, 5",
      "callTime": "08:00 AM",
      "makeup": "Natural",
      "wardrobe": "Business casual",
      "notes": "None"
    }
  ],
  "equipment": [
    {
      "category": "Camera",
      "item": "Sony A7S III",
      "quantity": 1,
      "reason": "Scenes 1-5",
      "priority": "Essential",
      "cost": "$200/day"
    }
  ],
  "budget": {
    "camera": "$500",
    "lighting": "$300",
    "sound": "$200",
    "productionDesign": "$400",
    "locations": "$600",
    "cast": "$1000",
    "other": "$500"
  }
}

Rules:
- Return ONLY JSON, starting with { and ending with }
- Extract ALL scenes from script
- List ALL characters
- Keep descriptions short (under 50 chars)
- Use realistic equipment for ${budget ? `$${budget.toLocaleString()}` : 'indie'} budget
- Estimate costs for ${generalLocation}`;
  }
}
