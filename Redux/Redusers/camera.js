import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, onSnapshot, query, where, orderBy} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"
import {useState} from "react";
import {Camera} from "expo-camera";


export const cameraSlice = createSlice({
    name: "camera",
    initialState: {
        image: null,
        title: null,
        caption: null,
        status: null,
    },
    reducers: {
        setImageState: (state, action) => {
            action.payload.nav.navigate("Claim Landmark");
            state.image = action.payload.image;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setCaption: (state, action) => {
            state.caption = action.payload;
        },
        setSubmit: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const {setImageState, setTitle, setCaption, setSubmit} = cameraSlice.actions;

export default cameraSlice.reducer;

