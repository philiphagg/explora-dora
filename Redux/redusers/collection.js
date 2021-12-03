import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, getFirestore, onSnapshot, query, where, orderBy} from "firebase/firestore";
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

export const collectionSlice = createSlice({
    name: "collection",
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
        editPost: (state, action) => {
            const user = auth.currentUser.uid;
            const post = action.payload.post;

            if(post.user === user){
                //state.list.find(x => x.id === post.id) = post;

                editPostFirebase(post.id, {post}).then(r => {
                    console.log("Edited post  ---------------------------------", state)
                })
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

export const {addPost, deletePost, likePost, unlikePost} = collectionSlice.actions;

export default collectionSlice.reducer;

