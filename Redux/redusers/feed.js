import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, query, where, onSnapshot, addDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase/firebaseconfig"

export const getFeed = createAsyncThunk('firebase/getPosts', async () => {
        return getDocs(query(collection(db, "Posts"))).then((res) => {
                let list = [];
                res.forEach((doc) => list.push(doc.data()));
                return list;
            }
        )
    }
)

async function addPostFirebase(post) {
    await addDoc(collection(db, "Posts"), post)
}

async function editPostFirebase(post) {
    await addDoc(collection(db, "Posts"), post)
}

/*

export const addPost = createAsyncThunk('firebase/getPosts', async ({post}) => {
        console.log("mange -----")
        return addDoc(collection(db, "Posts"), {
            title: "Test With Add Doc ",
            image: "https://media.timeout.com/images/105171709/image.jpg",
            likes: [],
            caption: "Detta är ett test text",
            user: auth.currentUser.uid,
            nick: "Magnus Uggla",
        });
    }
)


 */


export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        addPost: (state, action) => {
            console.log("Added post: " + action.payload.title);
            addPostFirebase(action.payload).then(r => {
                    console.log("Add performed successfully");
                    state.list = [...state.list, action.payload];
                }
            ).catch()
        },
        editPost: (state, action) => {
            console.log("Edit post: " + action.payload.title);
            editPostFirebase(action.payload).then(r => {
                    console.log("Add performed successfully");
                    state.list = [...state.list, action.payload];
                    //state.value = [...state.value].filter(x => x.id !== post);
                }
            ).catch()
        },
        likePost: (state, action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;
            if (!state.value.find(x => x.id === post).likes.includes(user))
                state.value.find(x => x.id === post).likes.push(user);
        },
        unlikePost: (state, action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;
            state.value = state.value.find(x => x.id === post).likes.filter(x => x === user);
            console.log(state)
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

export const {addPost} = feedSlice.actions;

export default feedSlice.reducer;
