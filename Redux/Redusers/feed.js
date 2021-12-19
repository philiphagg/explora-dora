import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import 'firebase/database';
import {addDoc, collection, getDocs, query, updateDoc, setDoc, getDoc, doc, orderBy,} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig"

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

async function addPostFirebase(post) {
    await addDoc(collection(db, "Posts"), post)
}

async function editPostFirebase(postId, data) {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, data);
}

export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        addPost: (state, action) => {
            state.status = "refresh";
            addPostFirebase({...action.payload, date: new Date()}).then(r => {
                }
            ).catch()
        },
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
        editPost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;

            if(post.user === user){
                editPostFirebase(post.id, {post}).then(r => {
                })
            }
        },
        resetFeed: (state, action) => {
            state.status = "resetting";
        },
    },
    extraReducers: {
        [getFeed.pending]: (state, action) => {
            state.status = "loading";
        },
        [getFeed.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        [getFeed.rejected]: (state, action) => {
            state.status = "failed";
        },
    }
});

export const {addPost, likePost, unlikePost,editPost, resetFeed} = feedSlice.actions;

export default feedSlice.reducer;
