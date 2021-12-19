import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedPresenter from "../Presenters/feedPresenter";
import PostMapView from "../Views/PostMapView"

const Stack = createStackNavigator();

const FeedViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Highlights" component={FeedPresenter}/>
            <Stack.Screen name="Post on Map" component={PostMapView}/>
        </Stack.Navigator>
    );
}
export default FeedViewNavigator;
