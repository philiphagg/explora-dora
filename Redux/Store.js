import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./redusers/user";
import themeReducer from "./redusers/theme";
import feedReducer from './redusers/feed';
import collectionReducer from './redusers/collection';
import highscoresReducer from './redusers/highscores';
import {collectionSlice} from "./redusers/collection";

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        collection: collectionReducer,
        feed: feedReducer,
        highscores: highscoresReducer,
    },
});

//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
