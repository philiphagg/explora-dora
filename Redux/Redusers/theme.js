import {createSlice} from "@reduxjs/toolkit"

import lightTheme from '../../Styles/StylesLight';
import darkTheme from '../../Styles/StylesDark';

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{value: {theme: {dark: boolean, lightMap, colors: {border: string, notification: string, background: string, statusbar: string, text: string, smallDetails: string, mapOverlayLight: string[], card: string, content: string, primary: string}}, style: {paragraph: {color: *, fontSize: number}, col: {padding: number, alignItems: string, flexWrap: string, flexDirection: string, justifyContent: string}, collectionImage: {width, height}, buttonText: {color: string, fontSize: number}, item: {padding: number, backgroundColor: *, margin: number, alignItems: string, flex: number, justifyContent: string, height}, inputLarge: {paddingVertical: number, backgroundColor: string, borderColor: *, borderRadius: number, borderWidth: number, width: string, paddingHorizontal: number, marginTop: number}, centered: {alignItems: string, justifyContent: string}, centerContent: {alignItems: string, flex: number, justifyContent: string}, buttonOutline: {backgroundColor: string, borderColor: *, borderWidth: number, marginTop: number}, h1: {color: *, fontSize: number}, h2: {color: *, fontSize: number}, inputContainer: {width: string}, buttonContainer: {alignItems: string, width: string, justifyContent: string, marginTop: number}, h3: {color: *, fontSize: number}, h4: {color: *, fontSize: number}, button: {padding: number, backgroundColor: *, borderRadius: number, alignItems: string, width: string}, input: {paddingVertical: number, backgroundColor: string, borderColor: *, borderRadius: number, borderWidth: number, width: number, paddingHorizontal: number, marginTop: number}, postImage: {width: string, height: number}, divider: {borderBottomColor: *, borderBottomWidth: number}, row: {padding: number, alignItems: string, flexWrap: string, flexDirection: string, justifyContent: string}, buttonOutlineText: {color: *, fontSize: number}}}}, {toggleTheme: reducers.toggleTheme, setLightTheme: reducers.setLightTheme, setTheme: reducers.setTheme, setDarkTheme: reducers.setDarkTheme}, string>}
 */
export const themeSlice = createSlice({
    name: "theme",
    initialState: {value: lightTheme},
    reducers: {
        /**
         * Toggles the theme.
         * @param state to update.
         */
        toggleTheme: (state) => {
            state.value.theme.dark === lightTheme.theme.dark ? state.value = darkTheme : state.value = lightTheme;
        },
        /**
         * Sets th theme to dark theme.
         * @param state to update.
         */
        setDarkTheme: (state) => {
            state.value = darkTheme;
        },
        /**
         * Sets the theme to light theme.
         * @param state to update.
         */
        setLightTheme: (state) => {
            state.value = lightTheme;
        },
        /**
         * Sets the theme by boolean.
         * @param state to update.
         * @param action contains a boolean dark.
         */
        setTheme: (state, action) => {
            state.value.theme.dark === action.payload.dark ? state.value = darkTheme : state.value = lightTheme;
        },
    },
});

export const {toggleTheme, setTheme, setDarkTheme, setLightTheme} = themeSlice.actions;

export default themeSlice.reducer;
