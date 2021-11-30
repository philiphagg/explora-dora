import {createSlice} from "@reduxjs/toolkit";


const initialStateValue=[
        {name: 'Darvin', score: '154'},
        {name: 'Gurra', score: '98'},
        {name: 'Johanna', score: '65'},
        {name: 'sara', score: '34'},
        {name: 'bertil', score: '31'},
        {name: 'ngt namn', score: '28'},
        {name: 'the NOob1', score: '15'},
        {name: 'the NOob2', score: '11'},
        {name: 'the NOob3', score: '9'},
        {name: 'the NOob4', score: '9'},
        {name: 'the NOob5', score: '9'},

            ];

export const highscoreSlice = createSlice({
    name: "highscores",
    initialState: {value: initialStateValue},
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, action.payload];
        },
        setPosts: (state, action) => {
            console.log(action.payload);
            state.value = action.payload;
        },
        addPosts: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, ...action.payload];
        },
        deletePost: (state,action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;

            state.value = [...state.value].filter( x => x.id !== post);
        },
        likePost: (state,action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;
            if(!state.value.find( x => x.id === post).likes.includes(user))
                state.value.find( x => x.id === post).likes.push(user);
        },
        unlikePost: (state,action) => {
            const user = action.payload.userId;
            const post = action.payload.postId;

            state.value = state.value.find( x => x.id === post).likes.filter(x => x === user);

            console.log(state)
        },
    },
});
//likePost({postID: post.id, userId: user.id}
export const {addPosts,addPost, likePost, deletePost, unlikePost} = highscoreSlice.actions;

export default highscoreSlice.reducer;
