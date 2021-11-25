import { createSlice } from "@reduxjs/toolkit"

import lightTheme from '../../StylesLight';
import darkTheme from '../../StylesDark';

export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: lightTheme },
    reducers: {
        toggleTheme: (state) => {
            state.value.settings.dark === lightTheme.settings.dark ? state.value = darkTheme :  state.value = lightTheme;
            console.log("Theme set", state.value)
        },
        setDarkTheme: (state) => {
            state.value = darkTheme;
            console.log("Theme set to dark")
        },
        setLightTheme: (state) => {
            state.value = lightTheme;
            console.log("Theme set to light")
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
