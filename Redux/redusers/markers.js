import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"

export const getMarkers = createAsyncThunk('markers/getMarkers ', async () => {
        return getDocs(query(collection(db, "markers"))).then((res) => {
                let list = [];
                res.forEach((doc) => list.push(doc.data()));
                return list;
            }
        )
    }
)

export const markersSlice = createSlice({
    name: "markers",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        remove
    },
    extraReducers: {
        [getMarkers.pending]: (state, action) => {
            state.status = "loading";
        },
        [getMarkers.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        [getMarkers.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {} = markersSlice .actions;
export default markersSlice .reducer;