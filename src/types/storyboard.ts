export interface StoryboardScene {
  scene: string;
  visualDescription: string;
  imageUrl?: string;
}

export interface SceneAnalysisResult {
  scenes: string[];
  visualDescriptions: string[];
}
