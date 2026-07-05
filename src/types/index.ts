export interface ResearchBrief {
  topic: string;
  service: string;
  pillar: string;
  stats: string[];
  hooks: string[];
  painPoints: string[];
  psychTrigger: string;
}

export interface Scene {
  sceneNumber: number;
  part: 'A' | 'B';
  duration: string;
  visual: string;
  voiceover: string;
  overlay: string;
  mood: string;
  videoPrompt: string;
}

export interface Script {
  title: string;
  totalScenes: number;
  scenes: Scene[];
  caption: string;
  hashtags: string[];
}

export interface ImageGenerationResult {
  sceneNumber: number;
  imagePath: string;
  imageToVideoPrompt: string;
  camera: string;
  motion: string;
  duration: string;
}

export interface DashboardData {
  date: string;
  service: string;
  pillar: string;
  topic: string;
  script: Script;
  images: ImageGenerationResult[];
  stats: string[];
  painPoints: string[];
  hooks: string[];
  psychTrigger: string;
  history: { date: string; topic: string; service: string }[];
}

export interface ContentCalendarEntry {
  dayNumber: number;
  dayOfWeek: string;
  service: string;
  topic: string;
  pillar: string;
}
