import { createSlice } from "@reduxjs/toolkit";


const initialStateValue = [];

export const postSlice = createSlice({
    name: "posts",
    initialState: { value: initialStateValue },
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, action.payload];
        },
        deletePost: (state) => {
            state.value = initialStateValue;
        },
        likePost: (state) => {
            state.value = [...state.value].find();
        },
    },
});

export const { addPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
