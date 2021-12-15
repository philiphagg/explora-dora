import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProgressPresenter from "../../Presenters/ProgressPresenter";
import Post from "../Post";

const Stack = createStackNavigator();

const ProgressViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Progress" component={ProgressPresenter}/>
            <Stack.Screen name="Collectible" component={Post}/>
        </Stack.Navigator>
    );
}
export default ProgressViewNavigator;
