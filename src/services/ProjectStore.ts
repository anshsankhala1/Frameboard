import { Project, CreateProjectInput } from '../types/project';

// In-memory storage for projects (will persist until server restart)
// TODO: Replace with database when MongoDB is enabled
class ProjectStore {
  private projects: Map<string, Project> = new Map();

  // Create a new project
  create(input: CreateProjectInput): Project {
    const id = this.generateId();
    const project: Project = {
      id,
      userId: input.userId,
      title: input.title,
      type: input.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      data: input.data,
    };

    this.projects.set(id, project);
    return project;
  }

  // Get all projects for a specific user, sorted by most recent
  getAllByUser(userId: string): Project[] {
    return Array.from(this.projects.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get all projects, sorted by most recent (kept for backwards compatibility)
  getAll(): Project[] {
    return Array.from(this.projects.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get project by ID
  getById(id: string): Project | null {
    return this.projects.get(id) || null;
  }

  // Update project
  update(id: string, data: Partial<Project>): Project | null {
    const project = this.projects.get(id);
    if (!project) return null;

    const updated: Project = {
      ...project,
      ...data,
      updatedAt: new Date(),
    };

    this.projects.set(id, updated);
    return updated;
  }

  // Delete project
  delete(id: string): boolean {
    return this.projects.delete(id);
  }

  // Get projects by type for a specific user
  getByTypeAndUser(type: 'callsheet' | 'storyboard' | 'ai_conversation', userId: string): Project[] {
    return Array.from(this.projects.values())
      .filter(p => p.type === type && p.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Get projects by type (kept for backwards compatibility)
  getByType(type: 'callsheet' | 'storyboard' | 'ai_conversation'): Project[] {
    return Array.from(this.projects.values())
      .filter(p => p.type === type)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Generate unique ID
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Export singleton instance
export const projectStore = new ProjectStore();
