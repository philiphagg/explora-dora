import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    id: 234234,
    name: "Thor Nilsson",
    birthYear: 2001,
    email: "thor755nilsson@gmail.com",
    distance: 35,
    paths: [
        {
            id: 1,
            distance: 23432,
            nodes: [
                {index: 1, long: 34234.234234, lat: 21341241.23213},
                {index: 2, long: 34234.234234, lat: 21341241.23213},
                {index: 3, long: 34234.234234, lat: 21341241.23213},
                {index: 4, long: 34234.234234, lat: 21341241.23213},
            ]
        },
        {
            id: 2,
            distance: 34234,
            nodes: [
                {index: 1, long: 34234.234234, lat: 21341241.23213},
                {index: 2, long: 34234.234234, lat: 21341241.23213},
                {index: 3, long: 34234.234234, lat: 21341241.23213},
                {index: 4, long: 34234.234234, lat: 21341241.23213},
            ]
        }
    ]


};
//const initialStateValue = { id: 234234, name: "Not logged IN", birthYear: 2001, email: "thor755nilsson@gmail.com", distance: 35 };

export const pathsSlice = createSlice({
    name: "paths",
    initialState: {value: initialStateValue},
    reducers: {
        addPath: (state, action) => {
            state.value = action.payload;
        },
        addNodeToPath: (state) => {
            state.value = initialStateValue;
        },
        deletePath: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const {addPath, addNodeToPath, deletePath} = pathsSlice.actions;

export default pathsSlice.reducer;
