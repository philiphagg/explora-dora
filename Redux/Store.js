import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./redusers/user";
import themeReducer from "./redusers/theme";
import postsReducer from './redusers/posts';
import highscoresReducer from './redusers/highscores';

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        posts: postsReducer,
        highscores: highscoresReducer,
    },
});

//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
