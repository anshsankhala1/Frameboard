import { Router, Request, Response } from 'express';
import { StoryboardService } from '../services/storyboard/StoryboardService';
import { Project } from '../models/Project';
import type { StoryboardProject } from '../types/project';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const storyboardService = new StoryboardService();

// POST /api/storyboard/generate - Generate storyboard from script
router.post('/generate', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

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

    console.log(`User ${req.user.email} generating storyboard for script:`, script.substring(0, 100) + '...');

    const storyboard = await storyboardService.generateStoryboardFromScript(script);

    // Save to user's projects
    const projectTitle = `Storyboard - ${new Date().toLocaleDateString()}`;
    const projectData: StoryboardProject = {
      script,
      scenes: storyboard,
    };

    // Create project in MongoDB
    const project = new Project({
      userId: req.user.id,
      title: projectTitle,
      type: 'storyboard',
      data: projectData,
    });

    await project.save();

    console.log(`Storyboard saved to user ${req.user.email}'s projects with ID: ${project._id}`);

    return res.status(200).json({
      success: true,
      storyboard: {
        projectId: project._id.toString(),
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
