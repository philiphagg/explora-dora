import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, onSnapshot, query, where, orderBy, doc, updateDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"

export const getCollection = createAsyncThunk('collection/getCollection', async () => {
        return getDocs(query(collection(db, "Posts"), where('user', '==', auth.currentUser.uid))).then((snapshot) => {
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

async function editPostFirebase(postId, data) {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, data);
}

export const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        editCaption: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload;

            if (post.user === user) {
                editPostFirebase(post.id, {...post}).then(r => {
                    console.log("Edited post  ---------------------------------", state)
                }).catch()
                state.list.find(x => x.id === post.id).caption = action.payload.caption;
            }
        },
    },
    extraReducers: {
        [getCollection.pending]: (state, action) => {
            state.status = "loading";
        },
        [getCollection.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        [getCollection.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {editCaption} = collectionSlice.actions;

export default collectionSlice.reducer;

