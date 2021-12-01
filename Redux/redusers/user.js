import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addDoc, collection, doc, getDocs, orderBy, query, updateDoc} from "firebase/firestore";
import {auth, db} from "../../Firebase/firebaseconfig";
import {getFeed} from "./feed";


export const getUsers = createAsyncThunk('users/getUsers', async () => {
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

async function addUserToFirebase(post) {
    await addDoc(collection(db, "Users"), post)
}

async function updateUserFirebase(dbUserId, data) {
    const userRef = doc(db, "Users", dbUserId);
    await updateDoc(userRef, data);
}


export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: null,
        emailText: null,
        passwordText: null,
        users: {
            status: null,
            list: [],
        },
        user: {id: null, email: ""},
        userData: {
            status: null,
            uid: null,
            name: "Your Username",
            darkTheme: true,
            score: 0,
            posts: 0,
            distance: 0,
        },
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = 'loggedIn';
        },
        editUser: (state, action) => {
            if (state.userData.status !== "updated") {
                addUserToFirebase({
                    status: "updated",
                    uid: state.user.id,
                    email: state.user.email,
                    name: action.payload.name,
                    darkTheme: false,
                    score: 0,
                    posts: 0,
                    distance: 0,
                }).then().catch()
            } else {
                if (state.users) {
                    const dbUserId = state.users.list.find(user => user.uid === state.user.id).id;
                    updateUserFirebase(dbUserId, {...action.payload}).then().catch()
                }
            }
            state.userData = {...state.userData, status: "updated", ...action.payload,}
        },
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.users.status = "loading";
        },
        [getUsers.fulfilled]: (state, {payload}) => {
            const userdata = payload.find(user => user.uid === state.user.id);
            if (userdata)
                state.userData = userdata;

            state.users.list = payload;
            state.users.status = "success";
        },
        [getUsers.rejected]: (state, action) => {
            state.users.status = "failed";
        },
    }
});

export const {
    login,
    editUser,
    updateScores,
} = userSlice.actions;

export default userSlice.reducer;
