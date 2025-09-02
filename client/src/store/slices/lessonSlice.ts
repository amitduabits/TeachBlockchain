import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { lessonAPI } from '../../services/api';

interface Exercise {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  solution: string;
  tests: TestCase[];
  hints: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
}

interface TestCase {
  id: string;
  input: any;
  expectedOutput: any;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  theory: string;
  examples: CodeExample[];
  exercises: Exercise[];
  prerequisites: string[];
  objectives: string[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
  language: 'javascript' | 'solidity' | 'typescript';
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  projects: Project[];
  prerequisites: string[];
  objectives: string[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  solution: string;
  tests: TestCase[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface LessonState {
  modules: Module[];
  currentModule: Module | null;
  currentLesson: Lesson | null;
  currentExercise: Exercise | null;
  isLoading: boolean;
  error: string | null;
  codeOutput: string;
  testResults: TestResult[];
  isRunningTests: boolean;
}

interface TestResult {
  testId: string;
  passed: boolean;
  output: string;
  error?: string;
}

const initialState: LessonState = {
  modules: [],
  currentModule: null,
  currentLesson: null,
  currentExercise: null,
  isLoading: false,
  error: null,
  codeOutput: '',
  testResults: [],
  isRunningTests: false,
};

// Async thunks
export const fetchModules = createAsyncThunk(
  'lesson/fetchModules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await lessonAPI.getModules();
      return response.modules;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch modules');
    }
  }
);

export const fetchLesson = createAsyncThunk(
  'lesson/fetchLesson',
  async ({ moduleId, lessonId }: { moduleId: string; lessonId: string }, { rejectWithValue }) => {
    try {
      const response = await lessonAPI.getLesson(moduleId, lessonId);
      return response.lesson;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lesson');
    }
  }
);

export const fetchExercise = createAsyncThunk(
  'lesson/fetchExercise',
  async ({ moduleId, exerciseId }: { moduleId: string; exerciseId: string }, { rejectWithValue }) => {
    try {
      const response = await lessonAPI.getExercise(moduleId, exerciseId);
      return response.exercise;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch exercise');
    }
  }
);

export const runTests = createAsyncThunk(
  'lesson/runTests',
  async ({ code, tests }: { code: string; tests: TestCase[] }, { rejectWithValue }) => {
    try {
      const response = await lessonAPI.runTests(code, tests);
      return response.results;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to run tests');
    }
  }
);

export const submitExercise = createAsyncThunk(
  'lesson/submitExercise',
  async ({ 
    moduleId, 
    exerciseId, 
    code, 
    testResults 
  }: { 
    moduleId: string; 
    exerciseId: string; 
    code: string; 
    testResults: TestResult[] 
  }, { rejectWithValue }) => {
    try {
      const response = await lessonAPI.submitExercise(moduleId, exerciseId, code, testResults);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit exercise');
    }
  }
);

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setCurrentModule: (state, action: PayloadAction<Module>) => {
      state.currentModule = action.payload;
    },
    setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
      state.currentLesson = action.payload;
    },
    setCurrentExercise: (state, action: PayloadAction<Exercise>) => {
      state.currentExercise = action.payload;
    },
    setCodeOutput: (state, action: PayloadAction<string>) => {
      state.codeOutput = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetTestResults: (state) => {
      state.testResults = [];
      state.isRunningTests = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Modules
      .addCase(fetchModules.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modules = action.payload;
        state.error = null;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Lesson
      .addCase(fetchLesson.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLesson = action.payload;
        state.error = null;
      })
      .addCase(fetchLesson.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Exercise
      .addCase(fetchExercise.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExercise = action.payload;
        state.error = null;
      })
      .addCase(fetchExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Run Tests
      .addCase(runTests.pending, (state) => {
        state.isRunningTests = true;
        state.error = null;
      })
      .addCase(runTests.fulfilled, (state, action) => {
        state.isRunningTests = false;
        state.testResults = action.payload;
        state.error = null;
      })
      .addCase(runTests.rejected, (state, action) => {
        state.isRunningTests = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentModule,
  setCurrentLesson,
  setCurrentExercise,
  setCodeOutput,
  clearError,
  resetTestResults,
} = lessonSlice.actions;

export default lessonSlice.reducer;
