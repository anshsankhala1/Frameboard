import { Router, Request, Response } from 'express';
import { AIAssistantService } from '../services/ai/AIAssistantService';
import { Project } from '../models/Project';
import type { AIConversationProject } from '../types/project';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const aiService = new AIAssistantService();

// POST /api/ai/analyze - Analyze creative work and provide feedback
router.post('/analyze', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message cannot be empty'
      });
    }

    console.log('AI Assistant analyzing message for user:', req.user?.email, message.substring(0, 100) + '...');

    const response = await aiService.analyzeCreativeWork(message, conversationHistory || []);

    return res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Error in /analyze route:', error);

    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Failed to analyze message',
        message: error.message
      });
    }

    return res.status(500).json({
      error: 'An unknown error occurred while analyzing message'
    });
  }
});

// POST /api/ai/save - Save AI conversation to projects
router.post('/save', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { title, messages } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        error: 'Title is required and must be a string'
      });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages array is required and must not be empty'
      });
    }

    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    const lastMessage = lastUserMessage?.content.substring(0, 100) || 'No messages';

    const projectData: AIConversationProject = {
      title,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp ? new Date(m.timestamp) : new Date()
      })),
      lastMessage,
    };

    // Create project in MongoDB
    const project = new Project({
      userId: req.user.id,
      title,
      type: 'ai_conversation',
      data: projectData,
    });

    await project.save();

    console.log(`AI conversation saved to user ${req.user.email}'s projects with ID: ${project._id}`);

    return res.status(200).json({
      success: true,
      projectId: project._id.toString(),
      message: 'Conversation saved successfully'
    });
  } catch (error) {
    console.error('Error in /save route:', error);

    if (error instanceof Error) {
      return res.status(500).json({
        error: 'Failed to save conversation',
        message: error.message
      });
    }

    return res.status(500).json({
      error: 'An unknown error occurred while saving conversation'
    });
  }
});

export default router;
