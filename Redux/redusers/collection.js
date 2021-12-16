import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"

export const getCollection = createAsyncThunk('collection/getCollection', async () => {
        return getDocs(query(collection(db, "Posts"), where('user', '==', auth.currentUser.uid))).then((snapshot) => {
                let list = [];
                snapshot.forEach(doc => {
                        list.push({id: doc.id, ...doc.data(), date: doc.data().date.seconds});
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

async function deletePostFirebase(postId) {
    const postRef = doc(db, "Posts", postId);
    await deleteDoc(postRef);
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
        deletePost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload;

            if (post.user === user) {
                deletePostFirebase(post.id).then(r => {
                }).catch()
                state.list = [...state.list].filter(x => x.id !== post.id)
            }
        },
        resetCollection: (state, action) => {
            state.status = "resetting";
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

export const {editCaption, deletePost, resetCollection} = collectionSlice.actions;

export default collectionSlice.reducer;

