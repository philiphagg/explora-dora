import {createSlice} from "@reduxjs/toolkit";


const initialStateValue = [
    {
        id: 1,
        title: "Kungsträdgården",
        image: "https://vadhanderisverige.se/wp-content/uploads/2020/06/KUngstr%C3%A4dg%C3%A5rden.jpg",
        likes: [5545],
        caption: "Kungsträdgården, vardagligt även Kungsan, är en park på Norrmalm i Stockholm.",
        user: "Olle Nillesson",
    },
    {
        id: 2,
        title: "Mcdonalds hamburgarnas rike",
        image: "https://www.mcdonalds.com/is/image/content/dam/se/nfl/newsroom/desktophero/stora_nog_1168x520.jpg?$Hero_Desktop$",
        likes: [113, 55, 21362, 777],
        caption: "En jävla massa burgare",
        user: "Olle Nillesson",
    },
    {
        id: 3,
        title: "Odenplan",
        image: "https://rolandwalden.files.wordpress.com/2021/05/dsc00531_210522.jpg",
        likes: [12, 982, 66534],
        caption: "ett sjukt bra torg, nära till fina pubar",
        user: "Olle Nillesson",
    },
    {
        id: 4,
        title: "Mcdonalds hamburgarnas rike",
        image: "https://www.mcdonalds.com/is/image/content/dam/se/nfl/newsroom/desktophero/stora_nog_1168x520.jpg?$Hero_Desktop$",
        likes: [113, 55, 21362, 777],
        caption: "En jävla massa burgare",
        user: "Olle Nillesson",
    },
    {
        id: 5,
        title: "Kungsträdgården",
        image: "https://vadhanderisverige.se/wp-content/uploads/2020/06/KUngstr%C3%A4dg%C3%A5rden.jpg",
        likes: [5545],
        caption: "Kungsträdgården, vardagligt även Kungsan, är en park på Norrmalm i Stockholm.",
        user: "Olle Nillesson",
    },
    {
        id: 6,
        title: "Kungsträdgården",
        image: "https://vadhanderisverige.se/wp-content/uploads/2020/06/KUngstr%C3%A4dg%C3%A5rden.jpg",
        likes: [5545],
        caption: "Kungsträdgården, vardagligt även Kungsan, är en park på Norrmalm i Stockholm.",
        user: "Olle Nillesson",
    },
    {
        id: 7,
        title: "Kungsträdgården",
        image: "https://vadhanderisverige.se/wp-content/uploads/2020/06/KUngstr%C3%A4dg%C3%A5rden.jpg",
        likes: [5545],
        caption: "Kungsträdgården, vardagligt även Kungsan, är en park på Norrmalm i Stockholm.",
        user: "Olle Nillesson",
    },
    {
        id: 8,
        title: "Kungsträdgården",
        image: "https://vadhanderisverige.se/wp-content/uploads/2020/06/KUngstr%C3%A4dg%C3%A5rden.jpg",
        likes: [5545],
        caption: "Kungsträdgården, vardagligt även Kungsan, är en park på Norrmalm i Stockholm.",
        user: "Olle Nillesson",
    },

    ];

export const collectionSlice = createSlice({
    name: "collections",
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
export const {addPost, likePost, deletePost, unlikePost} = collectionSlice.actions;

export default collectionSlice.reducer;
