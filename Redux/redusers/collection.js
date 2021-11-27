import {createSlice} from "@reduxjs/toolkit";


const initialStateValue = [
    {
        id: 1,
        title: "Stockholm Stadshus",
        image: "https://www.visitstockholm.se/media/original_images/f2affbc704fd4836be9b07087a955248.jpg",
        likes: [5545, 3455, 72, 55, 9345, 87, 24],
        caption: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi",
        user: "Olle Nillesson",
    },
    {
        id: 2,
        title: "Stockholm tunnelbana",
        image: "https://www.bloom-consulting.com/journal/wp-content/uploads/2020/01/bloom-consulting-stockholm-the-smart-city-brand-of-scandinavia.jpg",
        likes: [113, 55, 21362, 777],
        caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        user: "Per Gustavsson",
    },
    {
        id: 3,
        title: "Sergerls Torg",
        image: "https://hekla.com/blog/wp-content/uploads/2019/05/sergels-torg.jpg",
        likes: [12, 982, 66534],
        caption: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        user: "Thoren Nillesson",
    }];

export const postSlice = createSlice({
    name: "posts",
    initialState: {value: initialStateValue},
    reducers: {
        addPost: (state, action) => {
            console.log(action.payload);
            state.value = [...state.value, action.payload];
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
export const {addPost, likePost, deletePost, unlikePost} = postSlice.actions;

export default postSlice.reducer;
