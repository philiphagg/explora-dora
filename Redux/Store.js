import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Redusers/user";
import themeReducer from "./Redusers/theme";
import feedReducer from './Redusers/feed';
import collectionReducer from './Redusers/collection';
import markersReducer from './Redusers/markers';
import cameraReducer from './Redusers/camera';
import pathsReducer from './Redusers/paths';

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        feed: feedReducer,
        collection: collectionReducer,
        paths: pathsReducer,
        markers: markersReducer,
        camera: cameraReducer,
    },
});

//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
