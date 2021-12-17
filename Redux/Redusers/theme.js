import {createSlice} from "@reduxjs/toolkit"

import lightTheme from '../../Styles/StylesLight';
import darkTheme from '../../Styles/StylesDark';

export const themeSlice = createSlice({
    name: "theme",
    initialState: {value: lightTheme},
    reducers: {
        toggleTheme: (state) => {
            state.value.theme.dark === lightTheme.theme.dark ? state.value = darkTheme : state.value = lightTheme;
            console.log("Theme toggled")
        },
        setDarkTheme: (state) => {
            state.value = darkTheme;
            console.log("Theme set to dark")
        },
        setLightTheme: (state) => {
            state.value = lightTheme;
            console.log("Theme set to light")
        },
        setTheme: (state, action) => {
            state.value.theme.dark === action.payload.dark ? state.value = darkTheme : state.value = lightTheme;
            console.log("Theme set with slider")
        },
    },
});

export const {toggleTheme, setTheme, setDarkTheme, setLightTheme} = themeSlice.actions;

export default themeSlice.reducer;
