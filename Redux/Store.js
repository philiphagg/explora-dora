import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./redusers/user";
import themeReducer from "./redusers/theme";
import feedReducer from './redusers/feed';
import collectionReducer from './redusers/collection';
import markersReducer from './redusers/markers';
import cameraReducer from './redusers/camera';

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        feed: feedReducer,
        collection: collectionReducer,
        markers: markersReducer,
        camera: cameraReducer,
    },
});

//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
