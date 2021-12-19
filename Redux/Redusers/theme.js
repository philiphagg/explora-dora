import {createSlice} from "@reduxjs/toolkit"

import lightTheme from '../../Styles/StylesLight';
import darkTheme from '../../Styles/StylesDark';

export const themeSlice = createSlice({
    name: "theme",
    initialState: {value: lightTheme},
    reducers: {
        toggleTheme: (state) => {
            state.value.theme.dark === lightTheme.theme.dark ? state.value = darkTheme : state.value = lightTheme;
        },
        setDarkTheme: (state) => {
            state.value = darkTheme;
        },
        setLightTheme: (state) => {
            state.value = lightTheme;
        },
        setTheme: (state, action) => {
            state.value.theme.dark === action.payload.dark ? state.value = darkTheme : state.value = lightTheme;
        },
    },
});

export const {toggleTheme, setTheme, setDarkTheme, setLightTheme} = themeSlice.actions;

export default themeSlice.reducer;
