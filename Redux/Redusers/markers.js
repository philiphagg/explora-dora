import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../Firebase/firebaseconfig"

/**
 * Fetches markers from firebase collection "markers".
 */
export const getMarkers = createAsyncThunk('markers/getMarkers ', async () => {
        return getDocs(query(collection(db, "markers"))).then((res) => {
                let list = [];
                res.forEach((doc) => list.push(doc.data()));
                return list;
            }
        )
    }
)

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{list: *[], status: null}, {}, string>}
 */
export const markersSlice = createSlice({
    name: "markers",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
    },
    extraReducers: {
        /**
         * Handles the async operation of getCollection if pending.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getMarkers.pending]: (state, action) => {
            state.status = "loading";
        },
        /**
         * Handles the async operation of getCollection if fulfilled.
         * @param state to update.
         * @param payload provides the reducer data.
         */
        [getMarkers.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        /**
         * Handles the async operation of getCollection if rejected.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getMarkers.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {} = markersSlice.actions;
export default markersSlice .reducer;
