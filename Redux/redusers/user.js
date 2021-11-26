import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { id: 1337, name: "Thor Nilsson", birthYear: 2001, email: "thor755nilsson@gmail.com", distance: 35 };
//const initialStateValue = { id: 234234, name: "Not logged IN", birthYear: 2001, email: "thor755nilsson@gmail.com", distance: 35 };

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
