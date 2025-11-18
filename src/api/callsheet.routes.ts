import { Router, Request, Response } from 'express';
import { CallSheetService } from '../services/callsheet.service';
import type { CallSheetInput } from '../types/callsheet';
import { Project } from '../models/Project';
import type { CallSheetProject } from '../types/project';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * POST /api/callsheet/generate
 * Generate a call sheet using Claude API and return Excel file
 * Requires authentication
 */
router.post('/generate', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const callSheetInput: CallSheetInput = req.body;

    // Validate required fields
    if (!callSheetInput.productionTitle) {
      return res.status(400).json({ error: 'Production title is required' });
    }
    if (!callSheetInput.shootDate) {
      return res.status(400).json({ error: 'Shoot date is required' });
    }
    if (!callSheetInput.generalCallTime) {
      return res.status(400).json({ error: 'General call time is required' });
    }
    if (!callSheetInput.script || callSheetInput.script.trim().length === 0) {
      return res.status(400).json({ error: 'Script is required - please provide the script text for Claude to analyze' });
    }

    console.log(`User ${req.user.email} generating call sheet: ${callSheetInput.productionTitle}`);

    // Generate call sheet with AI search and Excel generation
    const generatedCallSheet = await CallSheetService.generateCallSheet(callSheetInput);

    // Save to user's projects
    const filename = `CallSheet_${callSheetInput.productionTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    const projectData: CallSheetProject = {
      productionTitle: callSheetInput.productionTitle,
      shootDate: callSheetInput.shootDate,
      excelData: generatedCallSheet.excelData,
      generatedContent: generatedCallSheet.generatedContent,
      filename,
    };

    // Create project in MongoDB
    const project = new Project({
      userId: req.user.id,
      title: callSheetInput.productionTitle,
      type: 'callsheet',
      data: projectData,
    });

    await project.save();

    console.log(`Call sheet saved to user ${req.user.email}'s projects with ID: ${project._id}`);

    // Return JSON response with base64 Excel data
    return res.status(200).json({
      success: true,
      callSheet: {
        id: generatedCallSheet.id,
        projectId: project._id.toString(),
        format: generatedCallSheet.format,
        generatedContent: generatedCallSheet.generatedContent,
        generatedAt: generatedCallSheet.generatedAt,
        // Excel data is base64 encoded
        excelData: generatedCallSheet.excelData,
        filename,
      },
    });
  } catch (error) {
    console.error('Error in call sheet generation:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate call sheet',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/callsheet/download/:id
 * Download generated Excel call sheet
 */
router.get('/download/:id', async (_req: Request, res: Response) => {
  try {
    // In a real implementation, you'd fetch the call sheet from database by ID
    // For now, we'll return an error message to implement this later
    return res.status(501).json({
      error: 'Download endpoint not yet implemented',
      message: 'Please use the Excel data from the generation response',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Download failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/callsheet/validate
 * Validate call sheet input before generation
 */
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const input: CallSheetInput = req.body;

    const errors: string[] = [];

    // Required fields validation
    if (!input.productionTitle) errors.push('Production title is required');
    if (!input.shootDate) errors.push('Shoot date is required');
    if (!input.shootingDayNumber) errors.push('Shooting day number is required');
    if (!input.generalCallTime) errors.push('General call time is required');
    if (!input.generalLocation) errors.push('General location is required');
    if (!input.shootingRange) errors.push('Shooting range is required');

    // Script validation - PRIMARY REQUIREMENT
    if (!input.script || input.script.trim().length === 0) {
      errors.push('Script is required - Claude will extract scenes, characters, and locations from it');
    }

    // Note: cast, crew, location, and scenes are now optional - Claude will extract/suggest them from the script

    if (errors.length > 0) {
      return res.status(400).json({
        valid: false,
        errors,
      });
    }

    return res.status(200).json({
      valid: true,
      message: 'Input is valid',
    });
  } catch (error) {
    return res.status(500).json({
      valid: false,
      error: 'Validation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
