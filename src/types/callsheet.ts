export interface CallSheetInput {
  // Production Details
  productionTitle: string;
  shootDate: string;
  shootingDayNumber: number;

  // Script Information - PRIMARY INPUT
  script: string; // Required: full script that Claude will parse to extract scenes, locations, characters, etc.

  // Budget Information - NEW
  budget?: number; // Optional: Film budget for equipment and PD recommendations

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

  // General Location (for crew availability and location finding) - UPDATED
  generalLocation: string; // e.g., "Orange County, CA" - Used for finding nearby filming locations

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
  // NEW: AI-suggested details for this scene
  suggestedLocation?: LocationSuggestion; // AI-found filming location
  requiredEquipment?: EquipmentRecommendation[]; // AI-suggested equipment
  requiredCrew?: string[]; // AI-suggested crew roles for this scene
  suggestedActors?: ActorSuggestion[]; // AI-suggested actors for characters in this scene
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

// NEW: Location suggestion from AI
export interface LocationSuggestion {
  name: string;
  address: string;
  description: string; // Why this location works for the scene
  distanceFromBase?: string;
  estimatedCost?: string;
  permitRequired?: boolean;
  accessibility?: string;
  matchReason: string; // How well it matches the script requirements
}

// NEW: Equipment recommendation based on script analysis
export interface EquipmentRecommendation {
  category: 'Camera' | 'Lighting' | 'Sound' | 'Grip' | 'Production Design' | 'Special Effects' | 'Other';
  item: string;
  quantity: number;
  reason: string; // Why this is needed for the scene
  estimatedCost?: string;
  priority: 'Essential' | 'Recommended' | 'Optional';
}

// NEW: Actor casting suggestion
export interface ActorSuggestion {
  characterName: string;
  characterDescription: string; // From script
  suggestedActorType: string; // Age range, physical description, etc.
  notes: string; // Additional casting notes
  // Note: In real implementation, would search platforms like Backstage
  // For now, Claude will provide general casting guidance
}

// NEW: Budget breakdown by department
export interface BudgetBreakdown {
  totalBudget: number;
  equipment: {
    estimated: number;
    breakdown: EquipmentRecommendation[];
  };
  productionDesign: {
    estimated: number;
    items: string[];
  };
  locations: {
    estimated: number;
    breakdown: { location: string; cost: string }[];
  };
  cast: {
    estimated: number;
    notes: string;
  };
  other: {
    estimated: number;
    notes: string;
  };
}

export interface GeneratedCallSheet {
  id: string;
  input: CallSheetInput;
  generatedContent: string; // The formatted call sheet from Claude in Excel/CSV format
  generatedAt: Date;
  format: 'excel' | 'csv' | 'text' | 'html' | 'pdf';
  // NEW: Structured data for the call sheet
  budgetBreakdown?: BudgetBreakdown;
  excelData?: string; // CSV or Excel-formatted data
}
