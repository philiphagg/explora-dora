import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import 'firebase/database';
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig";

export const getScores = createAsyncThunk('highscores/getScores', async () => {
        return getDocs(query(collection(db, "Users"), orderBy("score", "desc"))).then((snapshot) => {
                let list = [];
                snapshot.forEach(doc => {
                        list.push({id: doc.id, ...doc.data()});
                    }
                );
                console.log(list)
                return list;
            }
        )
    }
)

export const highscoreSlice = createSlice({
    name: "highscores",
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
    },
    extraReducers: {
        [getScores.pending]: (state, action) => {
            state.status = "loading";
        },
        [getScores.fulfilled]: (state, {payload}) => {
            state.list = payload;
            state.status = "success";
        },
        [getScores.rejected]: (state, action) => {
            state.status = "failed";
        }
    }
});
//likePost({postID: post.id, userId: user.id}
export const {} = highscoreSlice.actions;

export default highscoreSlice.reducer;
