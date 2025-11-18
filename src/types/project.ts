export interface Project {
  id: string;
  userId: string;
  title: string;
  type: 'callsheet' | 'storyboard' | 'ai_conversation';
  createdAt: Date;
  updatedAt: Date;
  data: CallSheetProject | StoryboardProject | AIConversationProject;
}

export interface CallSheetProject {
  productionTitle: string;
  shootDate: string;
  excelData?: string; // base64 encoded Excel file
  generatedContent?: any;
  filename?: string;
}

export interface StoryboardProject {
  script: string;
  scenes: Array<{
    scene: string;
    visualDescription: string;
    imageUrl: string | null;
  }>;
}

export interface AIConversationProject {
  title: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  lastMessage: string;
}

export interface CreateProjectInput {
  userId: string;
  title: string;
  type: 'callsheet' | 'storyboard' | 'ai_conversation';
  data: CallSheetProject | StoryboardProject | AIConversationProject;
}
