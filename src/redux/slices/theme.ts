import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: (typeof window !== 'undefined' && localStorage.getItem('theme-clothing') as 'light' | 'dark') || 'light',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme(state) {
        state.mode = state.mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme-clothing', state.mode);
      },
      setTheme(state, action: PayloadAction<'light' | 'dark'>) {
        state.mode = action.payload;
        localStorage.setItem('theme-clothing', state.mode);
      },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;