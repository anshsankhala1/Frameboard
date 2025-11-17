import { Router, Request, Response } from 'express';
import { StoryboardService } from '../services/storyboard/StoryboardService';

const router = Router();
const storyboardService = new StoryboardService();

// POST /api/storyboard/generate - Generate storyboard from script
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { script } = req.body;

    if (!script || typeof script !== 'string') {
      return res.status(400).json({
        error: 'Script is required and must be a string'
      });
    }

    if (script.trim().length === 0) {
      return res.status(400).json({
        error: 'Script cannot be empty'
      });
    }

    console.log('Generating storyboard for script:', script.substring(0, 100) + '...');

    const storyboard = await storyboardService.generateStoryboardFromScript(script);

    return res.status(200).json({
      success: true,
      storyboard: {
        scenes: storyboard,
        generatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error in /generate route:', error);

    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Failed to generate storyboard',
        message: error.message
      });
    }

    return res.status(500).json({
      error: 'An unknown error occurred while generating storyboard'
    });
  }
});

export default router;
