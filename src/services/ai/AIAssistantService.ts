import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('ANTHROPIC_API_KEY is required in environment variables');
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class AIAssistantService {
  async analyzeCreativeWork(userMessage: string, conversationHistory: Message[]): Promise<string> {
    try {
      // Build conversation messages for Claude
      const messages: Message[] = conversationHistory
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Add the new user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      // Call Claude API
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: `You are an expert filmmaking assistant with deep knowledge of:
- Screenwriting and script structure
- Cinematography and shot composition
- The 180-degree rule and continuity
- Shot lists and camera movements
- Lighting and visual storytelling
- Directing and performance
- Editing and pacing
- Production best practices

When users share scripts, shot lists, or creative work, carefully analyze them and provide:
1. Specific technical feedback (e.g., 180-degree rule violations, continuity errors)
2. Creative suggestions to enhance storytelling
3. Clear, actionable recommendations with examples
4. Positive reinforcement of what works well

Be professional, encouraging, and educational. Format your responses clearly with bullet points and sections when appropriate.`,
        messages: messages as any
      });

      // Extract the response text
      const assistantMessage = response.content[0];
      if (assistantMessage.type === 'text') {
        return assistantMessage.text;
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('Error in AIAssistantService:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to analyze creative work: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while analyzing creative work');
      }
    }
  }
}
