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

export interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
}
