import { Router, Request, Response } from 'express';
import { CallSheetService } from '../services/callsheet.service';
import type { CallSheetInput } from '../types/callsheet';

const router = Router();

/**
 * POST /api/callsheet/generate
 * Generate a call sheet using Claude API
 */
router.post('/generate', async (req: Request, res: Response) => {
  try {
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

    // Generate call sheet
    const generatedCallSheet = await CallSheetService.generateCallSheet(callSheetInput);

    return res.status(200).json({
      success: true,
      callSheet: generatedCallSheet,
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
