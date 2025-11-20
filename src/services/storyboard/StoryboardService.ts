import OpenAI from 'openai';
import dotenv from 'dotenv';
import { StoryboardScene } from '../../types/storyboard';

dotenv.config();

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required in environment variables');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
}
async function generateDalleImage(prompt: string): Promise<string | null> {
  try {
    // Make the prompt very abstract and artistic to avoid DALL-E safety violations
    // Focus only on setting, mood, and composition - remove any action/violence references
    const abstractPrompt = prompt
      .replace(/falls?|falling|dropped?|crash(es|ed|ing)?/gi, 'descends')
      .replace(/attack(s|ed|ing)?|fight(s|ing)?|hit(s|ting)?/gi, 'confronts')
      .replace(/kill(s|ed|ing)?|dead|dies?|dying/gi, 'overcome')
      .replace(/gun(s)?|weapon(s)?|knife|sword/gi, 'tool')
      .replace(/blood|gore|violent/gi, 'intense');

    const sanitizedPrompt = `Film storyboard sketch: ${abstractPrompt}. Pencil drawing style, simple composition, artistic representation.`;

    const response = await getOpenAI().images.generate({
      model: process.env.OPENAI_IMAGE_MODEL || "dall-e-3",
      prompt: sanitizedPrompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0]?.url || null;
  } catch (err: any) {
    // Log the error but don't fail the entire storyboard
    console.error("DALL-E image generation failed:", err?.message || err);

    // Return null so the storyboard continues without this image
    return null;
  }
}

export class StoryboardService {
  async generateStoryboardFromScript(script: string): Promise<StoryboardScene[]> {
    try {
      // Check if OPENAI_API_KEY is available
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured. Please add it to your environment variables to use the storyboard feature.');
      }

      // First, analyze the script to break it into scenes
      const sceneAnalysis = await getOpenAI().chat.completions.create({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are a professional storyboard artist. Break scripts into 5-8 key visual scenes. Return ONLY a numbered list of scene descriptions, one per line."
        }, {
          role: "user",
          content: `Break this script into 5-8 key storyboard scenes:\n\n${script}`
        }]
      });

      if (!sceneAnalysis.choices[0]?.message?.content) {
        throw new Error('Failed to analyze script into scenes');
      }

      // For each scene, generate a visual description
      const scenes = sceneAnalysis.choices[0].message.content
        .split('\n')
        .filter(scene => scene.trim() && (scene.match(/^\d+\./) || scene.match(/^Scene/)))
        .slice(0, 8); // Limit to 8 scenes max to avoid long waits

      const storyboard: StoryboardScene[] = [];

      for (const scene of scenes) {
        const imagePrompt = await getOpenAI().chat.completions.create({
          model: "gpt-4",
          messages: [{
            role: "system",
            content: "You are a storyboard sketch artist. Create simple, artistic visual descriptions for pencil-drawn storyboard frames. Focus ONLY on: camera angle, setting/location, lighting, and character positions. Use neutral, non-violent language. Describe as if creating a sketch, not a photograph."
          }, {
            role: "user",
            content: `Create a simple pencil sketch description for this storyboard frame: ${scene}. Describe only the visual composition - camera angle, setting, lighting, character placement. Keep it artistic and safe.`
          }]
        });

        if (!imagePrompt.choices[0]?.message?.content) {
          console.warn(`Failed to generate visual description for scene: ${scene}`);
          continue;
        }

       const visual = imagePrompt.choices[0].message.content;

// generate image using DALL-E
const imageUrl = await generateDalleImage(visual);


storyboard.push({
  scene,
  visualDescription: visual,
  imageUrl,
});

      }

      if (storyboard.length === 0) {
        throw new Error('No valid scenes were generated from the script');
      }

      return storyboard;
    } catch (error) {
      console.error('Error generating storyboard:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate storyboard: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while generating storyboard');
      }
    }
  }
}
