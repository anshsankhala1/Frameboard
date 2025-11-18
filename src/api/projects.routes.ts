import { Router, Request, Response } from 'express';
import { Project } from '../models/Project';
import { CreateProjectInput } from '../types/project';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/projects - Get all projects for the authenticated user
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Fetch projects from MongoDB, sorted by most recent
    const projects = await Project.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Convert MongoDB _id to id for consistency
    const formattedProjects = projects.map(p => ({
      id: p._id.toString(),
      userId: p.userId,
      title: p.title,
      type: p.type,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      data: p.data
    }));

    return res.status(200).json({
      success: true,
      projects: formattedProjects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

// GET /api/projects/:id - Get a specific project
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const project = await Project.findById(id).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Ensure user can only access their own projects
    if (project.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    // Format the response
    const formattedProject = {
      id: project._id.toString(),
      userId: project.userId,
      title: project.title,
      type: project.type,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      data: project.data
    };

    return res.status(200).json({
      success: true,
      project: formattedProject,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
    });
  }
});

// POST /api/projects - Create a new project
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const input: CreateProjectInput = req.body;

    if (!input.title || !input.type || !input.data) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, type, and data are required',
      });
    }

    // Create project in MongoDB (userId is from authenticated user)
    const project = new Project({
      userId: req.user.id,
      title: input.title,
      type: input.type,
      data: input.data
    });

    await project.save();

    // Format the response
    const formattedProject = {
      id: project._id.toString(),
      userId: project.userId,
      title: project.title,
      type: project.type,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      data: project.data
    };

    return res.status(201).json({
      success: true,
      project: formattedProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create project',
    });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Ensure user can only delete their own projects
    if (project.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete project',
    });
  }
});

// GET /api/projects/type/:type - Get projects by type for authenticated user
router.get('/type/:type', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { type } = req.params;

    if (type !== 'callsheet' && type !== 'storyboard' && type !== 'ai_conversation') {
      return res.status(400).json({
        success: false,
        error: 'Invalid type. Must be callsheet, storyboard, or ai_conversation',
      });
    }

    // Fetch projects from MongoDB filtered by type and user
    const projects = await Project.find({
      userId: req.user.id,
      type
    })
      .sort({ createdAt: -1 })
      .lean();

    // Convert MongoDB _id to id for consistency
    const formattedProjects = projects.map(p => ({
      id: p._id.toString(),
      userId: p.userId,
      title: p.title,
      type: p.type,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      data: p.data
    }));

    return res.status(200).json({
      success: true,
      projects: formattedProjects,
    });
  } catch (error) {
    console.error('Error fetching projects by type:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
});

export default router;
