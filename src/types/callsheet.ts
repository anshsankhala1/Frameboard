export interface CallSheetInput {
  // Production Details
  productionTitle: string;
  shootDate: string;
  shootingDayNumber: number;

  // Script Information - PRIMARY INPUT
  script: string; // Required: full script that Claude will parse to extract scenes, locations, characters, etc.

  // Crew Information
  generalCallTime: string;
  crew?: CrewMember[]; // Optional: Claude can suggest based on script

  // Cast Information
  cast?: CastMember[]; // Optional: Claude can extract from script

  // Location Details
  location?: LocationInfo; // Optional: Claude can extract from script

  // Shooting Range
  shootingRange: {
    type: 'days' | 'weeks' | 'months';
    duration: number;
  };

  // General Location (for crew availability)
  generalLocation: string; // e.g., "Orange County"

  // Additional Info
  weatherInfo?: WeatherInfo;
  safetyInfo?: SafetyInfo;
  mealSchedule?: MealSchedule;

  // Auto-extracted from script (optional manual override)
  scenes?: SceneInfo[]; // Optional: Normally extracted by Claude from script
}

export interface SceneInfo {
  sceneNumber: string;
  scriptPages: string; // e.g., "3/8", "1 2/8"
  description: string;
  intExt: 'INT' | 'EXT' | 'INT/EXT';
  dayNight: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK';
  location: string;
  estimatedTime?: string;
}

export interface CrewMember {
  name: string;
  role: string;
  department: string;
  callTime?: string; // If different from general call time
  contact?: string;
  notes?: string;
}

export interface CastMember {
  actorName: string;
  characterName: string;
  callTime: string;
  wardrobeNotes?: string;
  makeupNotes?: string;
  specialInstructions?: string;
  contact?: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  parkingInfo?: string;
  accessInstructions?: string;
  basecampAddress?: string;
  basecampNotes?: string;
}

export interface WeatherInfo {
  forecast: string;
  highTemp?: number;
  lowTemp?: number;
  sunrise?: string;
  sunset?: string;
}

export interface SafetyInfo {
  emergencyContacts: EmergencyContact[];
  nearestHospital?: {
    name: string;
    address: string;
    phone: string;
    distance?: string;
  };
  safetyOfficer?: {
    name: string;
    contact: string;
  };
  specialSafetyNotes?: string[];
}

export interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
}

export interface MealSchedule {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  catering?: string;
  notes?: string;
}

export interface GeneratedCallSheet {
  id: string;
  input: CallSheetInput;
  generatedContent: string; // The formatted call sheet from Claude
  generatedAt: Date;
  format: 'text' | 'html' | 'pdf';
}
