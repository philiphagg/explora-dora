import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Redusers/user";
import themeReducer from "./Redusers/theme";
import feedReducer from './Redusers/feed';
import collectionReducer from './Redusers/collection';
import markersReducer from './Redusers/markers';
import pathsReducer from './Redusers/paths';

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        feed: feedReducer,
        collection: collectionReducer,
        paths: pathsReducer,
        markers: markersReducer,
    },
});

export default store;
