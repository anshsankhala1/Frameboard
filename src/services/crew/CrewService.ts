// @ts-nocheck
import { Project } from '../../models/Project';
import { Types } from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface CrewMember {
  user?: Types.ObjectId;
  role?: string;
  permissions: string[];
}

export class CrewService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email service here
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async assignCrewMember(projectId: string, userId: string, role: string) {
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      // Check if crew member already exists
      const existingMember = project.crew.find(
        member => member.user?.toString() === userId
      );

      if (existingMember) {
        throw new Error('Crew member already assigned to project');
      }

      // Add crew member
      project.crew.push({
        user: new Types.ObjectId(userId),
        role,
        permissions: this.getDefaultPermissionsForRole(role)
      });

      await project.save();
      return project;
    } catch (error) {
      console.error('Error assigning crew member:', error);
      throw error;
    }
  }

  async sendCrewNotification(
    recipients: string[],
    subject: string,
    message: string
  ) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients.join(','),
        subject,
        text: message
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending crew notification:', error);
      throw error;
    }
  }

  private getDefaultPermissionsForRole(role: string): string[] {
    const permissions = {
      director: ['edit_script', 'edit_schedule', 'manage_crew', 'view_all'],
      producer: ['edit_budget', 'edit_schedule', 'manage_crew', 'view_all'],
      cinematographer: ['edit_storyboard', 'view_script', 'view_schedule'],
      editor: ['view_script', 'view_schedule', 'edit_notes'],
      writer: ['edit_script', 'view_schedule', 'edit_notes'],
      crew: ['view_schedule', 'view_notes']
    };

    return permissions[role] || ['view_schedule'];
  }
}
