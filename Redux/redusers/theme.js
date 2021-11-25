import { createSlice } from "@reduxjs/toolkit"

import lightTheme from '../../StylesLight';
import darkTheme from '../../StylesDark';


const initialStateValue = lightTheme;

export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: darkTheme },
    reducers: {
        toggleTheme: (state) => {
            state.value.theme.flex === lightTheme.theme.flex ? state.value = darkTheme :  state.value = lightTheme;
            console.log("Theme set")
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
