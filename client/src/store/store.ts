import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import lessonReducer from './slices/lessonSlice';
import progressReducer from './slices/progressSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    progress: progressReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Default export for import store from './store/store'
export default store;
