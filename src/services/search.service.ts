import Anthropic from '@anthropic-ai/sdk';

export class SearchService {
  private static anthropic: Anthropic;

  private static getClient() {
    if (!this.anthropic) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY not set');
      }
      this.anthropic = new Anthropic({ apiKey });
    }
    return this.anthropic;
  }

  /**
   * Search for real filming locations near a city
   */
  static async findFilmingLocations(
    sceneDescription: string,
    locationType: string,
    city: string
  ): Promise<any[]> {
    const client = this.getClient();

    const prompt = `You are a location scout finding real filming locations.

TASK: Find 2-3 actual, real venues in ${city} that match this filming requirement:

Scene Type: ${locationType}
Scene Description: ${sceneDescription}
City/Area: ${city}

Search for real businesses, venues, or locations (restaurants, parks, buildings, etc.) in ${city} that would be suitable for filming this scene.

For each location, provide:
1. Exact venue name (real business/location name)
2. Full address in ${city}
3. Why it matches the scene requirements
4. Estimated distance from city center
5. Accessibility notes (parking, public transit)
6. Estimated permit/rental cost (or if it's a public space)

Return as JSON array:
[
  {
    "venueName": "actual venue name",
    "address": "full address",
    "matchReason": "why this works",
    "distance": "X miles from downtown",
    "accessibility": "parking/transit info",
    "permitCost": "estimated cost or 'Public space'",
    "contact": "phone or website if known",
    "notes": "additional relevant info"
  }
]

Search for REAL, SPECIFIC venues that actually exist in ${city}. Use current knowledge of businesses and locations in this area.`;

    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      });

      const responseText =
        message.content[0].type === 'text' ? message.content[0].text : '[]';

      // Extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return [];
    } catch (error) {
      console.error('Error finding locations:', error);
      return [];
    }
  }

  /**
   * Search for actors on casting platforms
   */
  static async findActors(
    characterName: string,
    characterDescription: string,
    city: string,
    budget?: number
  ): Promise<any[]> {
    const client = this.getClient();

    const budgetGuidance = budget && budget > 0
      ? budget < 10000
        ? 'Focus on NON-UNION actors willing to work for FREE or deferred payment. Many aspiring actors on Backstage/Actors Access work on student films and indie projects for experience and reel footage.'
        : budget < 50000
        ? 'Look for NON-UNION actors at $100-200/day or SAG Ultra Low Budget rates. Actors Access and Backstage have many affordable options.'
        : 'Can consider SAG-AFTRA actors at standard rates ($1000+/day) or non-union professionals.'
      : 'Assume low budget - prioritize FREE/deferred payment actors.';

    const prompt = `You are a casting director searching for budget-friendly actors.

TASK: Find affordable actors for this character in ${city}:

Character: ${characterName}
Description: ${characterDescription}
Location: ${city}
Budget: ${budget ? `$${budget.toLocaleString()} (total film budget)` : 'Low/No budget'}

BUDGET GUIDANCE: ${budgetGuidance}

**IMPORTANT: Prioritize actors who will work for FREE or minimal pay (deferred payment, copy/credit/meals).**

For this character, provide:
1. Ideal actor profile (age range, physical characteristics, skills)
2. Best platforms to find budget-friendly actors (Backstage has many willing to work for free)
3. Search keywords to use
4. Union status (prefer NON-UNION for budget)
5. Realistic compensation (many actors work for free on indie films)
6. Casting notes

Return as JSON array with 2-3 budget-friendly casting options:
[
  {
    "characterName": "${characterName}",
    "castingType": "e.g., Male, 25-35, Athletic build",
    "platform": "Backstage (filter: willing to work for copy/credit)",
    "searchKeywords": "keywords to find this type",
    "unionStatus": "Non-Union (more affordable)",
    "estimatedRate": "Free (deferred payment) / $50-100 stipend",
    "notes": "Many emerging actors willing to work for reel footage",
    "suggestedActors": "Search Backstage for local actors seeking experience"
  }
]

Focus on AFFORDABLE/FREE options in ${city}. Note: Platforms like Backstage, Largo.ai, and Actors Access have filters for actors willing to work on low/no budget projects.`;

    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      });

      const responseText =
        message.content[0].type === 'text' ? message.content[0].text : '[]';

      // Extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return [];
    } catch (error) {
      console.error('Error finding actors:', error);
      return [];
    }
  }

  /**
   * Search for equipment rental companies
   */
  static async findEquipmentRentals(
    equipmentType: string,
    city: string
  ): Promise<any> {
    const client = this.getClient();

    const prompt = `Find real camera/lighting/sound equipment rental companies in ${city}.

Equipment Type: ${equipmentType}
Location: ${city}

Provide 1-2 actual rental houses in ${city} that provide this equipment.

Return as JSON:
{
  "rentalCompany": "company name",
  "contact": "phone or website",
  "estimatedCost": "rental rate range"
}`;

    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      });

      const responseText =
        message.content[0].type === 'text' ? message.content[0].text : '{}';

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return {};
    } catch (error) {
      console.error('Error finding rental companies:', error);
      return {};
    }
  }
}
