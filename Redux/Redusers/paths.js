import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig";

/**
 * Fetches the users paths from firebase collection "Paths".
 */
export const getPaths = createAsyncThunk('paths/getPaths', async () => {
        return getDocs(query(collection(db, "Paths", auth.currentUser.uid, "paths"))).then((snapshot) => {
                let list = [];
                snapshot.forEach(doc => {
                        list.push({id: doc.id, ...doc.data()});
                    }
                );
                return list;
            }
        )
    }
)

/**
 * Reducer which adds a new coordinate to firebase collection "Paths" to the specific user.
 * @param coords to add.
 * @returns {Promise<void>}
 */
async function addCoordinatesFirebase(coords) {
    await addDoc(collection(db, "Paths", auth.currentUser.uid, "paths"), coords)
}

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{list: *[], status: null}, {addNodeToPath: reducers.addNodeToPath}, string>}
 */
export const pathsSlice = createSlice({
    name: "paths",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        /**
         * Reducer which adds a coordinate point to the paths list.
         * @param state to update.
         * @param action provides the reducer with coordinate data.
         */
        addNodeToPath: (state, action) => {
            addCoordinatesFirebase(action.payload).then();
            state.list = [...state.list, action.payload];
        },
    },
    extraReducers: {
        /**
         * Handles the async operation of getCollection if pending.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getPaths.pending]: (state, action) => {
            state.status = "loading";
        },
        /**
         * Handles the async operation of getCollection if fulfilled.
         * @param state to update.
         * @param payload provides the reducer data.
         */
        [getPaths.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        /**
         * Handles the async operation of getCollection if rejected.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getPaths.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {addNodeToPath} = pathsSlice.actions;

export default pathsSlice.reducer;
