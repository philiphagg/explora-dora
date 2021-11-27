import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id: undefined, name: "Thor Nilsson", birthYear: 2001, email: "thor755nilsson@gmail.com", distance: 35 };

//const initialStateValue = { id: null, name: "Not logged IN nul", birthYear: 2001, email: "", distance: 35 };
//const initialStateValue = { };                 

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
