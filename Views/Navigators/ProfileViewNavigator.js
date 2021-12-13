import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilePresenter from "../../Presenters/ProfilePresenter";

const Stack = createStackNavigator();

const ProfileViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Profile" component={ProfilePresenter}/>
        </Stack.Navigator>
    );
}
export default ProfileViewNavigator;
