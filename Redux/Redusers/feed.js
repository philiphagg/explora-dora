import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import 'firebase/database';
import {addDoc, collection, getDocs, query, updateDoc, doc, orderBy,} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig"

/**
 * Fetches posts in descending order from firebase collection "Posts".
 */
export const getFeed = createAsyncThunk('firebase/getPosts', async () => {
        return getDocs(query(collection(db, "Posts"), orderBy("date", "desc"))).then((snapshot) => {
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
 * Adds a new post to firebase collection "Posts".
 * @param post to add.
 * @returns {Promise<void>}
 */
async function addPostFirebase(post) {
    await addDoc(collection(db, "Posts"), post)
}

/**
 * Updates a specific post on firebase collection "Posts".
 * @param postId is the id of post to update.
 * @param data to update.
 * @returns {Promise<void>}
 */
async function editPostFirebase(postId, data) {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, data);
}

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{list: *[], status: null}, {unlikePost: reducers.unlikePost, editPost: reducers.editPost, resetFeed: reducers.resetFeed, addPost: reducers.addPost, likePost: reducers.likePost}, string>}
 */
export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        /**
         * Reducer which adds a new post to firebase collection "Posts".
         * @param state to update.
         * @param action provides the reducer with post data.
         */
        addPost: (state, action) => {
            state.status = "refresh";
            addPostFirebase({...action.payload, date: new Date()}).then(r => {
                }
            ).catch()
        },
        /**
         * Reducer which adds user to like count of specific post.
         * @param state  to update.
         * @param action provides the reducer with post data.
         */
        likePost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;
            const likes = [...state.list.find(x => x.id === post.id).likes];

            if (!likes.includes(user)) {
                likes.push(user);
                state.list.find(x => x.id === post.id).likes.push(user);

                editPostFirebase(post.id, {likes: likes}).then(r => {
                })
            }
        },
        /**
         * Reducer which deletes user from like count of specific post.
         * @param state to update.
         * @param action provides the reducer with post data.
         */
        unlikePost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;
            let likes = [...state.list.find(x => x.id === post.id).likes];

            if (likes.includes(user)) {
                likes = likes.filter(x => x !== user);
                state.list.find(x => x.id === post.id).likes = likes;
                editPostFirebase(post.id, {likes: likes}).then(r => {
                })
            }
        },
        /**
         * Reducer which updates the a specific post.
         * @param state  to update.
         * @param action provides the reducer with post data.
         */
        editPost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;

            if (post.user === user) {
                editPostFirebase(post.id, {post}).then(r => {
                })
            }
        },
        /**
         * Reducer which resets the status of feed to indicate that new data should be fetched.
         * @param state  to update.
         * @param action provides the reducer no data.
         */
        resetFeed: (state, action) => {
            state.status = "resetting";
        },
    },
    extraReducers: {
        /**
         * Handles the async operation of getFeed if pending.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getFeed.pending]: (state, action) => {
            state.status = "loading";
        },
        /**
         * Handles the async operation of getFeed if fulfilled.
         * @param state to update.
         * @param payload provides the reducer data.
         */
        [getFeed.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        /**
         * Handles the async operation of getFeed if rejected.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getFeed.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
});

export const {addPost, likePost, unlikePost, editPost, resetFeed} = feedSlice.actions;

export default feedSlice.reducer;
