export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
  timestamp: number;
}

// User Authentication
export interface User {
  id: string;
  username: string;
}

// Types for Screening Tools
export interface QuizOption {
  text: string;
  value: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface Interpretation {
  score: number;
  level: string;
  text: string;
  color: string; // Added color for a data-driven UI
}

export interface Test {
  id: 'phq9' | 'gad7';
  title: string;
  description: string;
  questions: QuizQuestion[];
  interpretations: Interpretation[];
}

// Types for Resource Hub
export type ResourceType = 'article' | 'video';
export type ResourceCategory = 'Stress' | 'Anxiety' | 'Relationships' | 'Self-Care' | 'Academic';

export interface Resource {
  id: string;
  type: ResourceType;
  category: ResourceCategory;
  title: string;
  snippet: string;
  imageUrl: string;
  // For articles, this is text. For videos, it's an embed URL.
  content: string; 
}

// Types for Appointment Booking
export interface TimeSlot {
  hour: number; // 24-hour format
  minute: number;
}

export interface WeeklyAvailability {
  // 0 = Sunday, 1 = Monday, etc.
  [dayOfWeek: number]: TimeSlot[];
}

export interface Counsellor {
  id: string;
  name: string;
  specialties: string[];
  imageUrl: string;
  availability: WeeklyAvailability; // Counsellors now have their own availability
}

export interface Appointment {
  id: string;
  userId: string;
  counsellorId: string;
  counsellorName: string;
  counsellorImageUrl: string;
  timestamp: number; // UTC timestamp of the appointment
}