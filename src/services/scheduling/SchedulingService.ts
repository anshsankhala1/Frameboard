import { Project } from '../../models/Project';
import { ScheduleUpdate, ShootDate, ProjectSchedule } from '../../types/schedule';
import { Types } from 'mongoose';

export class SchedulingService {
  async updateSchedule(projectId: string, scheduleUpdates: ScheduleUpdate) {
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      if (!project.schedule) {
        project.schedule = { shootDates: [] };
      }

      // Update schedule dates with ObjectId conversion
      project.schedule.shootDates = scheduleUpdates.shootDates.map(date => ({
        date: new Date(date.date),
        location: date.location,
        scenes: date.scenes,
        crew: date.crew.map(id => new Types.ObjectId(id))
      }));

      await project.save();
      return project;
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  }

  async optimizeSchedule(projectId: string) {
    try {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error('Project not found');
      }

      if (!project.schedule) {
        project.schedule = { shootDates: [] };
      }

      // Here you would implement schedule optimization logic
      // For example:
      // 1. Group scenes by location to minimize location changes
      // 2. Consider crew availability
      // 3. Account for time of day requirements
      // 4. Factor in weather predictions
      // 5. Optimize for budget constraints

      const optimizedSchedule = this.calculateOptimalSchedule({
        schedule: {
          shootDates: project.schedule.shootDates.map(date => ({
            ...date,
            crew: date.crew.map(id => 
              id instanceof Types.ObjectId ? id : new Types.ObjectId(String(id))
            )
          }))
        }
      });

      project.schedule.shootDates = optimizedSchedule;
      await project.save();
      return project;
    } catch (error) {
      console.error('Error optimizing schedule:', error);
      throw error;
    }
  }

  private calculateOptimalSchedule(project: { schedule: ProjectSchedule }): ShootDate[] {
    // Placeholder for schedule optimization algorithm
    // This would be a complex algorithm considering multiple factors:
    
    const shootDates: ShootDate[] = [...project.schedule.shootDates];
    
    // Sort by location to minimize travel time
    shootDates.sort((a, b) => {
      const locA = a.location || '';
      const locB = b.location || '';
      if (locA < locB) return -1;
      if (locA > locB) return 1;
      return 0;
    });

    // Group scenes by location
    const locationGroups = new Map<string, ShootDate[]>();
    shootDates.forEach(date => {
      const location = date.location || 'unspecified';
      if (!locationGroups.has(location)) {
        locationGroups.set(location, []);
      }
      const group = locationGroups.get(location);
      if (group) {
        group.push(date);
      }
    });

    // Create optimized schedule
    const optimizedDates: ShootDate[] = [];
    locationGroups.forEach(dates => {
      optimizedDates.push(...dates);
    });

    return optimizedDates;
  }
}
