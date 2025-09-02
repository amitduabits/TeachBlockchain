import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  codeEditorTheme: 'vs-light' | 'vs-dark';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  notifications: Notification[];
  modals: {
    login: boolean;
    register: boolean;
    settings: boolean;
    help: boolean;
  };
  loading: {
    global: boolean;
    lesson: boolean;
    exercise: boolean;
    tests: boolean;
  };
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  codeEditorTheme: 'vs-light',
  fontSize: 14,
  tabSize: 2,
  wordWrap: true,
  minimap: true,
  notifications: [],
  modals: {
    login: false,
    register: false,
    settings: false,
    help: false,
  },
  loading: {
    global: false,
    lesson: false,
    exercise: false,
    tests: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      state.codeEditorTheme = action.payload === 'dark' ? 'vs-dark' : 'vs-light';
    },
    setCodeEditorTheme: (state, action: PayloadAction<'vs-light' | 'vs-dark'>) => {
      state.codeEditorTheme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setTabSize: (state, action: PayloadAction<number>) => {
      state.tabSize = action.payload;
    },
    setWordWrap: (state, action: PayloadAction<boolean>) => {
      state.wordWrap = action.payload;
    },
    setMinimap: (state, action: PayloadAction<boolean>) => {
      state.minimap = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    openModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key as keyof UIState['modals']] = false;
      });
    },
    setLoading: (state, action: PayloadAction<{ type: keyof UIState['loading']; value: boolean }>) => {
      state.loading[action.payload.type] = action.payload.value;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setCodeEditorTheme,
  setFontSize,
  setTabSize,
  setWordWrap,
  setMinimap,
  addNotification,
  removeNotification,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoading,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
