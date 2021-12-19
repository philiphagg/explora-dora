import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"

/**
 * Fetches the post data of a specific user from firebase collection "Posts".
 */
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

/**
 * Updates a specific post on firebase collection "Posts".
 * @param postId Id of post to edit.
 * @param data to update.
 * @returns {Promise<void>}
 */
async function editPostFirebase(postId, data) {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, data);
}

/**
 * Deletes a specific post from firebase collection "Posts".
 * @param postId is the Id of post to delete
 * @returns {Promise<void>}
 */
async function deletePostFirebase(postId) {
    const postRef = doc(db, "Posts", postId);
    await deleteDoc(postRef);
}

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{list: *[], status: null}, {editCaption: reducers.editCaption, deletePost: reducers.deletePost, resetCollection: reducers.resetCollection}, string>}
 */
export const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        /**
         * Reducer which updates the caption of specific post.
         * @param state to update.
         * @param action provides the reducer with post data.
         */
        editCaption: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload;

            if (post.user === user) {
                editPostFirebase(post.id, {...post}).then(r => {
                }).catch()
                state.list.find(x => x.id === post.id).caption = action.payload.caption;
            }
        },
        /**
         * Reducer which deletes the caption of specific post.
         * @param state to update.
         * @param action provides the reducer with post data.
         */
        deletePost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload;

            if (post.user === user) {
                deletePostFirebase(post.id).then(r => {
                }).catch()
                state.list = [...state.list].filter(x => x.id !== post.id)
            }
        },
        /**
         * Reducer which resets the status of collection to indicate that new data should be fetched.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        resetCollection: (state, action) => {
            state.status = "resetting";
        },
    },
    extraReducers: {
        /**
         * Handles the async operation of getCollection if pending.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getCollection.pending]: (state, action) => {
            state.status = "loading";
        },
        /**
         * Handles the async operation of getCollection if fulfilled.
         * @param state to update.
         * @param payload provides the reducer data.
         */
        [getCollection.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        /**
         * Handles the async operation of getCollection if rejected.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getCollection.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});

export const {editCaption, deletePost, resetCollection} = collectionSlice.actions;

export default collectionSlice.reducer;

