import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../../Firebase/firebaseconfig"

export const getFeed = createAsyncThunk('firebase/getPosts', async () => {
        return getDocs(query(collection(db, "Posts"))).then((res) => {
                let list = [];
                res.forEach((doc) => list.push(doc.data()));
                return list;
            }
        )
    }
)

export const feedSlice = createSlice({
    name: "feed",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, action.payload];
        },
        deletePost: (state, action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;
            state.value = [...state.value].filter(x => x.id !== post);
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
        }
    }
});

export const {addPost} = feedSlice.actions;

export default feedSlice.reducer;
