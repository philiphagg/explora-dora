import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProgressPresenter from "../Presenters/ProgressPresenter";
import PostView from "../Views/PostView";

const Stack = createStackNavigator();

const ProgressViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="My Progress" component={ProgressPresenter}/>
            <Stack.Screen name="Collectible" component={PostView}/>
        </Stack.Navigator>
    );
}
export default ProgressViewNavigator;
