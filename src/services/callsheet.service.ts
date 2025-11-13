import Anthropic from '@anthropic-ai/sdk';
import type { CallSheetInput, GeneratedCallSheet } from '../types/callsheet';

export class CallSheetService {
  /**
   * Generate a comprehensive call sheet using Claude API
   */
  static async generateCallSheet(input: CallSheetInput): Promise<GeneratedCallSheet> {
    try {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      console.log('API Key in service:', apiKey ? `${apiKey.substring(0, 20)}...` : 'UNDEFINED');

      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is not set');
      }

      // Initialize Anthropic client with API key from environment
      const anthropic = new Anthropic({
        apiKey: apiKey,
      });

      const prompt = this.buildCallSheetPrompt(input);

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const generatedContent = message.content[0].type === 'text'
        ? message.content[0].text
        : '';

      const callSheet: GeneratedCallSheet = {
        id: `cs-${Date.now()}`,
        input,
        generatedContent,
        generatedAt: new Date(),
        format: 'text',
      };

      return callSheet;
    } catch (error) {
      console.error('Error generating call sheet:', error);
      throw new Error('Failed to generate call sheet');
    }
  }

  /**
   * Build a detailed prompt for Claude to generate the call sheet
   */
  private static buildCallSheetPrompt(input: CallSheetInput): string {
    const {
      productionTitle,
      shootDate,
      shootingDayNumber,
      generalCallTime,
      script,
      scenes,
      cast,
      crew,
      location,
      shootingRange,
      generalLocation,
      weatherInfo,
      safetyInfo,
      mealSchedule,
    } = input;

    return `You are an experienced Assistant Director creating a professional film call sheet.

# YOUR PRIMARY TASK
Parse the provided script and automatically extract:
1. All scenes with scene numbers, INT/EXT, location names, DAY/NIGHT, and descriptions
2. All characters that appear in the script
3. Location details mentioned in the script
4. Any special production notes or requirements from the script

Then use this extracted information along with the production details below to generate a comprehensive, well-formatted call sheet.

# SCRIPT TO ANALYZE
${script}

# PRODUCTION DETAILS
- Production Title: ${productionTitle}
- Shoot Date: ${shootDate}
- Shooting Day Number: Day ${shootingDayNumber}
- General Call Time: ${generalCallTime}
- Shooting Range: ${shootingRange.duration} ${shootingRange.type}
- General Location: ${generalLocation}

${location ? `
# LOCATION INFORMATION (Provided)
- Location Name: ${location.name}
- Address: ${location.address}
${location.parkingInfo ? `- Parking: ${location.parkingInfo}` : ''}
${location.accessInstructions ? `- Access Instructions: ${location.accessInstructions}` : ''}
${location.basecampAddress ? `- Basecamp Address: ${location.basecampAddress}` : ''}
${location.basecampNotes ? `- Basecamp Notes: ${location.basecampNotes}` : ''}
` : '# LOCATION INFORMATION\nExtract location information from the script'}

${cast && cast.length > 0 ? `
# CAST (Provided)
${cast.map(c => `
${c.characterName} (${c.actorName})
- Call Time: ${c.callTime}
${c.wardrobeNotes ? `- Wardrobe: ${c.wardrobeNotes}` : ''}
${c.makeupNotes ? `- Makeup: ${c.makeupNotes}` : ''}
${c.specialInstructions ? `- Special Instructions: ${c.specialInstructions}` : ''}
${c.contact ? `- Contact: ${c.contact}` : ''}
`).join('\n')}
` : '# CAST\nExtract all characters from the script and suggest appropriate call times based on their scenes'}

${crew && crew.length > 0 ? `
# CREW (Provided)
${crew.map(c => `
${c.role} - ${c.name} (${c.department})
${c.callTime ? `- Call Time: ${c.callTime}` : `- Call Time: ${generalCallTime}`}
${c.contact ? `- Contact: ${c.contact}` : ''}
${c.notes ? `- Notes: ${c.notes}` : ''}
`).join('\n')}
` : '# CREW\nSuggest standard crew roles based on the script requirements'}

${scenes && scenes.length > 0 ? `
# SCENES (Manually Provided - use these instead of extracting)
${scenes.map((scene) => `
Scene ${scene.sceneNumber} - ${scene.intExt}. ${scene.location} - ${scene.dayNight}
- Script Pages: ${scene.scriptPages}
- Description: ${scene.description}
${scene.estimatedTime ? `- Estimated Time: ${scene.estimatedTime}` : ''}
`).join('\n')}
` : ''}

${weatherInfo ? `
# WEATHER FORECAST
- Forecast: ${weatherInfo.forecast}
${weatherInfo.highTemp ? `- High: ${weatherInfo.highTemp}°F` : ''}
${weatherInfo.lowTemp ? `- Low: ${weatherInfo.lowTemp}°F` : ''}
${weatherInfo.sunrise ? `- Sunrise: ${weatherInfo.sunrise}` : ''}
${weatherInfo.sunset ? `- Sunset: ${weatherInfo.sunset}` : ''}
` : ''}

${mealSchedule ? `
# MEAL SCHEDULE
${mealSchedule.breakfast ? `- Breakfast: ${mealSchedule.breakfast}` : ''}
${mealSchedule.lunch ? `- Lunch: ${mealSchedule.lunch}` : ''}
${mealSchedule.dinner ? `- Dinner: ${mealSchedule.dinner}` : ''}
${mealSchedule.catering ? `- Catering: ${mealSchedule.catering}` : ''}
${mealSchedule.notes ? `- Notes: ${mealSchedule.notes}` : ''}
` : ''}

${safetyInfo ? `
# SAFETY INFORMATION
${safetyInfo.emergencyContacts.map(ec => `- ${ec.role}: ${ec.name} - ${ec.phone}`).join('\n')}
${safetyInfo.nearestHospital ? `
Nearest Hospital:
- ${safetyInfo.nearestHospital.name}
- ${safetyInfo.nearestHospital.address}
- ${safetyInfo.nearestHospital.phone}
${safetyInfo.nearestHospital.distance ? `- Distance: ${safetyInfo.nearestHospital.distance}` : ''}
` : ''}
${safetyInfo.safetyOfficer ? `
Safety Officer: ${safetyInfo.safetyOfficer.name} - ${safetyInfo.safetyOfficer.contact}
` : ''}
${safetyInfo.specialSafetyNotes ? `
Special Safety Notes:
${safetyInfo.specialSafetyNotes.map(note => `- ${note}`).join('\n')}
` : ''}
` : ''}

# OUTPUT REQUIREMENTS
Create a professional, industry-standard call sheet with the following structure:
1. Header with production info
2. Clear call times (general and specific for each cast/crew member)
3. Detailed shooting schedule with ALL scenes extracted from the script (with scene numbers, INT/EXT, location, DAY/NIGHT, page count, and brief description)
4. Complete cast list with all characters from the script
5. Organized crew list by department
6. Location details (extracted from script or use provided info)
7. Weather information (if provided)
8. Safety contacts and procedures (if provided)
9. Meal schedule (if provided)
10. Any special notes or requirements

Format it professionally and make it easy to read and reference on set. Use clear sections, bullet points, and emphasis where appropriate. Make sure to extract ALL relevant information from the script and present it in a logical, industry-standard format that production professionals would expect to see.`;
  }
}
