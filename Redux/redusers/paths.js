import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig";

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

async function addCoordinatesFirebase(coords) {
    await addDoc(collection(db, "Paths", auth.currentUser.uid, "paths"), coords)
}

export const pathsSlice = createSlice({
    name: "paths",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        addNodeToPath: (state, action) => {
            addCoordinatesFirebase(action.payload).then();
            state.list = [...state.list, action.payload];
        },
    },
    extraReducers: {
        [getPaths.pending]: (state, action) => {
            state.status = "loading";
        },
        [getPaths.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        [getPaths.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {addNodeToPath} = pathsSlice.actions;

export default pathsSlice.reducer;
