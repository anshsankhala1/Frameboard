import { Types } from 'mongoose';

export interface ShootDate {
  date?: Date;
  location?: string;
  scenes: string[];
  crew: Types.ObjectId[];
}

export interface ScheduleUpdate {
  shootDates: {
    date: string | Date;
    location: string;
    scenes: string[];
    crew: string[];  // Will be converted to ObjectId
  }[];
}

export interface ProjectSchedule {
  shootDates: ShootDate[];
}
