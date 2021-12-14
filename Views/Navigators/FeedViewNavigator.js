import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeedPresenter from "../../Presenters/feedPresenter";

const Stack = createStackNavigator();

const FeedViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Feed" component={FeedPresenter}/>
        </Stack.Navigator>
    );
}
export default FeedViewNavigator;
