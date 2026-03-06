export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  reputation: number;
  avatar: string;
}

export interface AppSettings {
  language: string;
  theme: 'dark' | 'light' | 'gradient' | 'custom';
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  feedLayout: 'grid' | 'masonry' | 'list';
  aiInterventionLevel: number; // 0 to 100
}

export interface SavedItem {
  id: string;
  type: 'pin' | 'idea' | 'project' | 'translation';
  title: string;
  content: any;
  category: string;
  savedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'idea' | 'startup' | 'prototype';
  status: 'draft' | 'active' | 'funded' | 'sold';
  owner_id: string;
  metrics: {
    roi?: string;
    impact?: string;
    viability?: number;
  };
  image_url: string;
}

export interface Opportunity {
  id: string;
  user_id: string;
  type: 'investor' | 'team' | 'market' | 'project';
  content: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface InspirationItem {
  id: string;
  type: 'image' | 'video' | 'project' | 'startup' | 'prototype' | 'concept' | 'demo';
  mediaUrl: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  category: InspirationCategory;
  createdAt: string;
  interactions: {
    likes: number;
    saves: number;
    comments: number;
  };
  tags: string[];
  isTrending?: boolean;
}

export type InspirationCategory = 
  | 'tecnologia' 
  | 'startups' 
  | 'design' 
  | 'inovação' 
  | 'educação' 
  | 'marketing' 
  | 'inteligência artificial' 
  | 'empreendedorismo'
  | 'engenharia';

export interface UserBehavior {
  likedIds: string[];
  savedIds: string[];
  viewTimes: Record<string, number>;
  visitedCategories: InspirationCategory[];
  createdProjectIds: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GamificationStats {
  points: number;
  level: number;
  badges: Badge[];
  nextLevelThreshold: number;
  recentActions: {
    id: string;
    action: string;
    points: number;
    timestamp: string;
  }[];
}

export type AuthMethod = 'password' | 'fingerprint' | 'pattern' | 'face';

export interface SecuritySettings {
  passwordEnabled: boolean;
  fingerprintEnabled: boolean;
  patternEnabled: boolean;
  faceEnabled: boolean;
  preferredMethod: AuthMethod;
  failedAttempts: number;
  lastFailedAttempt?: string;
  isLocked: boolean;
  lockUntil?: string;
}

export interface LoginActivity {
  id: string;
  device: string;
  location: string;
  date: string;
  status: 'success' | 'failed';
}
