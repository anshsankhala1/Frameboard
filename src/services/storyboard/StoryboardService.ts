import OpenAI from 'openai';
import dotenv from 'dotenv';
import { StoryboardScene } from '../../types/storyboard';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const REALISTIC_STYLE = "high-resolution realistic photo, natural lighting, real human proportions, neutral color grading, photojournalistic style, clean composition, consistent actor appearance, no cinematic lighting, no stylization, no filters, no hdr";

async function generateLocalImage(prompt: string): Promise<string | null> {
  try {
    const res = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        steps: 25,
        width: 512,
        height: 512
      }),
    });

    const data = await res.json();

    if (data.images && data.images.length > 0) {
      return `data:image/png;base64,${data.images[0]}`;
    }

    return null;
  } catch (err) {
    console.error("Image generation failed:", err);
    return null;
  }
}

export class StoryboardService {
  async generateStoryboardFromScript(script: string): Promise<StoryboardScene[]> {
    try {
      // First, analyze the script to break it into scenes
      const sceneAnalysis = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are a professional storyboard artist and film director."
        }, {
          role: "user",
          content: `Analyze this script and break it into key visual scenes: ${script}`
        }]
      });

      if (!sceneAnalysis.choices[0]?.message?.content) {
        throw new Error('Failed to analyze script into scenes');
      }

      // For each scene, generate a visual description
      const scenes = sceneAnalysis.choices[0].message.content
        .split('\n')
        .filter(scene => scene.trim());

      const storyboard: StoryboardScene[] = [];

      for (const scene of scenes) {
        const imagePrompt = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{
            role: "system",
            content: "Create a detailed visual description for an AI image generator."
          }, {
            role: "user",
            content: `Create a cinematic shot description for: ${scene}`
          }]
        });

        if (!imagePrompt.choices[0]?.message?.content) {
          console.warn(`Failed to generate visual description for scene: ${scene}`);
          continue;
        }

       const visual = imagePrompt.choices[0].message.content;

// generate image using local SD
const imageUrl = await generateLocalImage(`${visual}, ${REALISTIC_STYLE}`);


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
