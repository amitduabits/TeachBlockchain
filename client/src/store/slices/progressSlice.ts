import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { progressAPI } from '../../services/api';

// API Response interfaces
interface CompleteLessonResponse {
  success: boolean;
  message: string;
  experienceGained: number;
  levelUp: boolean;
  moduleId: string;
  timeSpent: number;
}

interface CompleteExerciseResponse {
  success: boolean;
  message: string;
  experienceGained: number;
  levelUp: boolean;
  moduleId: string;
  timeSpent: number;
}

interface CompleteProjectResponse {
  success: boolean;
  message: string;
  experienceGained: number;
  levelUp: boolean;
  moduleId: string;
  timeSpent: number;
}

interface Progress {
  userId: string;
  moduleId: string;
  lessonId?: string;
  exerciseId?: string;
  projectId?: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  attempts: number;
  lastAttempt: Date;
  code?: string;
  testResults?: TestResult[];
}

interface TestResult {
  testId: string;
  passed: boolean;
  output: string;
  error?: string;
}

interface UserProgress {
  userId: string;
  totalLessons: number;
  completedLessons: number;
  totalExercises: number;
  completedExercises: number;
  totalProjects: number;
  completedProjects: number;
  totalTimeSpent: number;
  currentLevel: number;
  experience: number;
  streak: number;
  achievements: Achievement[];
  moduleProgress: ModuleProgress[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'learning' | 'coding' | 'project' | 'streak';
}

interface ModuleProgress {
  moduleId: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  completedExercises: number;
  totalExercises: number;
  completedProjects: number;
  totalProjects: number;
  progress: number; // percentage
  timeSpent: number;
  lastAccessed: Date;
}

interface ProgressState {
  userProgress: UserProgress | null;
  currentProgress: Progress | null;
  isLoading: boolean;
  error: string | null;
  leaderboard: LeaderboardEntry[];
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  level: number;
  experience: number;
  completedLessons: number;
  completedExercises: number;
  completedProjects: number;
  streak: number;
  rank: number;
}

const initialState: ProgressState = {
  userProgress: null,
  currentProgress: null,
  isLoading: false,
  error: null,
  leaderboard: [],
};

// Async thunks
export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await progressAPI.getUserProgress();
      return response.data.progress;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

export const updateProgress = createAsyncThunk(
  'progress/updateProgress',
  async (progressData: Partial<Progress>, { rejectWithValue }) => {
    try {
      const response = await progressAPI.updateProgress(progressData);
      return response.data.progress;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update progress');
    }
  }
);

export const completeLesson = createAsyncThunk<CompleteLessonResponse, { moduleId: string; lessonId: string; timeSpent: number }>(
  'progress/completeLesson',
  async ({ moduleId, lessonId, timeSpent }, { rejectWithValue }) => {
    try {
      const response = await progressAPI.completeLesson(moduleId, lessonId, timeSpent);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete lesson');
    }
  }
);

export const completeExercise = createAsyncThunk<CompleteExerciseResponse, { 
  moduleId: string; 
  exerciseId: string; 
  code: string; 
  testResults: TestResult[]; 
  timeSpent: number; 
  attempts: number; 
}>(
  'progress/completeExercise',
  async ({ moduleId, exerciseId, code, testResults, timeSpent, attempts }, { rejectWithValue }) => {
    try {
      const response = await progressAPI.completeExercise(moduleId, exerciseId, code, testResults, timeSpent, attempts);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete exercise');
    }
  }
);

export const completeProject = createAsyncThunk<CompleteProjectResponse, { 
  moduleId: string; 
  projectId: string; 
  code: string; 
  testResults: TestResult[]; 
  timeSpent: number; 
}>(
  'progress/completeProject',
  async ({ moduleId, projectId, code, testResults, timeSpent }, { rejectWithValue }) => {
    try {
      const response = await progressAPI.completeProject(moduleId, projectId, code, testResults, timeSpent);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete project');
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  'progress/fetchLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await progressAPI.getLeaderboard();
      return response.data.leaderboard;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setCurrentProgress: (state, action: PayloadAction<Progress>) => {
      state.currentProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTimeSpent: (state, action: PayloadAction<number>) => {
      if (state.currentProgress) {
        state.currentProgress.timeSpent += action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Progress
      .addCase(fetchUserProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProgress = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.currentProgress = action.payload;
      })
      // Complete Lesson
      .addCase(completeLesson.fulfilled, (state, action) => {
        if (state.userProgress) {
          state.userProgress.completedLessons += 1;
          state.userProgress.totalTimeSpent += action.payload.timeSpent;
          state.userProgress.experience += action.payload.experienceGained;
          
          // Update module progress
          const moduleProgress = state.userProgress.moduleProgress.find(
            mp => mp.moduleId === action.payload.moduleId
          );
          if (moduleProgress) {
            moduleProgress.completedLessons += 1;
            moduleProgress.progress = (moduleProgress.completedLessons / moduleProgress.totalLessons) * 100;
            moduleProgress.timeSpent += action.payload.timeSpent;
            moduleProgress.lastAccessed = new Date();
          }
        }
      })
      // Complete Exercise
      .addCase(completeExercise.fulfilled, (state, action) => {
        if (state.userProgress) {
          state.userProgress.completedExercises += 1;
          state.userProgress.totalTimeSpent += action.payload.timeSpent;
          state.userProgress.experience += action.payload.experienceGained;
          
          // Update module progress
          const moduleProgress = state.userProgress.moduleProgress.find(
            mp => mp.moduleId === action.payload.moduleId
          );
          if (moduleProgress) {
            moduleProgress.completedExercises += 1;
            moduleProgress.progress = ((moduleProgress.completedLessons + moduleProgress.completedExercises) / 
              (moduleProgress.totalLessons + moduleProgress.totalExercises)) * 100;
            moduleProgress.timeSpent += action.payload.timeSpent;
            moduleProgress.lastAccessed = new Date();
          }
        }
      })
      // Complete Project
      .addCase(completeProject.fulfilled, (state, action) => {
        if (state.userProgress) {
          state.userProgress.completedProjects += 1;
          state.userProgress.totalTimeSpent += action.payload.timeSpent;
          state.userProgress.experience += action.payload.experienceGained;
          
          // Update module progress
          const moduleProgress = state.userProgress.moduleProgress.find(
            mp => mp.moduleId === action.payload.moduleId
          );
          if (moduleProgress) {
            moduleProgress.completedProjects += 1;
            moduleProgress.progress = ((moduleProgress.completedLessons + moduleProgress.completedExercises + moduleProgress.completedProjects) / 
              (moduleProgress.totalLessons + moduleProgress.totalExercises + moduleProgress.totalProjects)) * 100;
            moduleProgress.timeSpent += action.payload.timeSpent;
            moduleProgress.lastAccessed = new Date();
          }
        }
      })
      // Fetch Leaderboard
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
      });
  },
});

export const {
  setCurrentProgress,
  clearError,
  updateTimeSpent,
} = progressSlice.actions;

export default progressSlice.reducer;
