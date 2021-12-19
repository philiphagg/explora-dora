import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addDoc, collection, doc, getDocs, orderBy, query, updateDoc} from "firebase/firestore";
import {db} from "../../Firebase/firebaseconfig";

/**
 * Fetches users in descending order from firebase collection "Users".
 */
export const getUsers = createAsyncThunk('users/getUsers', async () => {
        return getDocs(query(collection(db, "Users"), orderBy("score", "desc"))).then((snapshot) => {
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

/**
 * Adds a new user to firebase.
 * @param post
 * @returns {Promise<void>}
 */
async function addUserToFirebase(post) {
    await addDoc(collection(db, "Users"), post)
}

/**
 * Updates a user on firebase.
 * @param dbUserId is the id of the user.
 * @param data is tha data to update.
 * @returns {Promise<void>}
 */
async function updateUserFirebase(dbUserId, data) {
    const userRef = doc(db, "Users", dbUserId);
    await updateDoc(userRef, data);
}

/**
 * Creates a slice of the store and maps reducers to actions.
 * @type {Slice<{userData: {uid: null, score: number, distance: number, name: string, darkTheme: boolean, posts: number, status: null}, passwordText: null, emailText: null, user: {id: null, email: string}, users: {list: *[], status: null}, status: null}, {logout: reducers.logout, editUser: reducers.editUser, resetUser: reducers.resetUser, login: reducers.login}, string>}
 */
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
        /**
         * Reducer which handles the login.
         * @param state to update.
         * @param action provides the reducer with user data.
         */
        login: (state, action) => {
            state.user = action.payload;
            state.status = 'loggedIn';
        },
        /**
         * Reducer which updates user information.
         * @param state to update.
         * @param action provides the reducer with user data.
         */
        editUser: (state, action) => {
            if (state.userData.status !== "updated") {
                addUserToFirebase({
                    status: "updated",
                    uid: state.user.id,
                    email: state.user.email,
                    name: "Enter Username",
                    darkTheme: false,
                    score: 0,
                    posts: 0,
                    distance: 0, ...action.payload
                }).then().catch()
            } else {
                if (state.users.status === "success") {
                    const dbUserId = state.users.list.find(user => user.uid === state.user.id).id;
                    updateUserFirebase(dbUserId, {...action.payload}).then().catch()
                }
            }
            state.userData = {...state.userData, status: "updated", ...action.payload,}
        },
        /**
         * Reducer which resets the status of user list to indicate that new data should be fetched.
         * @param state to update.
         * @param action provides the reducer with no data.
         */
        resetUser: (state, action) => {
            state.users.status = "resetting";
        },
        /**
         * Reducer which handles the logout.
         * @param state to update.
         * @param action provides the reducer with no data.
         */
        logout: (state, action) => {
            state.status = "signingOut";
        },
    },
    extraReducers: {
        /**
         * Handles the async operation of getFeed if pending.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getUsers.pending]: (state, action) => {
            state.users.status = "loading";
        },
        /**
         * Handles the async operation of getFeed if fulfilled.
         * @param state to update.
         * @param payload provides the reducer data.
         */
        [getUsers.fulfilled]: (state, {payload}) => {
            const userdata = payload.find(user => user.uid === state.user.id);
            if (userdata)
                state.userData = userdata;

            state.users.list = payload;
            state.users.status = "success";
        },
        /**
         * Handles the async operation of getFeed if rejected.
         * @param state to update.
         * @param action provides the reducer no data.
         */
        [getUsers.rejected]: (state, action) => {
            state.users.status = "failed";
        },
    }
});

export const { login, editUser, resetUser, logout } = userSlice.actions;

export default userSlice.reducer;
