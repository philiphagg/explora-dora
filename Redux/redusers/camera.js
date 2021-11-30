import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"
import {useState} from "react";
import {Camera} from "expo-camera";




export const cameraSlice = createSlice({
    name: "camera",
    initialState: {
        camera: null,
        image: null,
        hasPermission: null,
        type: Camera.Constants.Type.back,
        status: null,
        title: null,
        caption: null,
    },
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, action.payload];
        },
    },
});

export const {addPost, deletePost, likePost, unlikePost} = cameraSlice.actions;

export default cameraSlice.reducer;

