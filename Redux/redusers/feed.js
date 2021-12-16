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
            console.log("Added post: " + action.payload.title);
            addPostFirebase({...action.payload, date: new Date()}).then(r => {
                    console.log("Add performed successfully");
                    state.list = [ {...action.payload, date: new Date().valueOf()/1000}, ...state.list];
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
                    console.log("Like added ---------------------------------", state)
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
                //console.log("Del  ---------------------------------", likes, user)
                editPostFirebase(post.id, {likes: likes}).then(r => {
                    console.log("Like deleted  ---------------------------------", state)
                })
            }
        },
        editPost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;

            if(post.user === user){
                editPostFirebase(post.id, {post}).then(r => {
                    console.log("Edited post  ---------------------------------", state)
                })
            }
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

export const {addPost, likePost, unlikePost,editPost} = feedSlice.actions;

export default feedSlice.reducer;
