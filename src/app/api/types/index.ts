import { z } from 'zod';

export {
  insertProfileSchema,
  insertSettingsSchema,
  insertMoodLogSchema,
  insertAIRecommendationSchema,
  journalEntrySchema,
  aiAnalysisSchema,
  type Profile,
  type InsertProfile,
  type Settings,
  type InsertSettings,
  type MoodLog,
  type InsertMoodLog,
  type AIRecommendation,
  type InsertAIRecommendation,
  type JournalEntry,
  type InsertJournalEntry,
  type AIAnalysisLog,
  type InsertAIAnalysis,
} from '@shared/schema';

// Additional API-specific types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
}

export interface JournalEntryWithAnalysis extends JournalEntry {
  analysis?: AIAnalysisLog;
}

export interface UserStats {
  totalJournalEntries: number;
  currentStreak: number;
  averageMood: number;
  totalMoodLogs: number;
  lastEntryDate: Date | null;
}

export interface DashboardData {
  stats: UserStats;
  recentEntries: JournalEntry[];
  recentMoods: MoodLog[];
  aiRecommendations: AIRecommendation[];
}
