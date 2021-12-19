import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfilePresenter from "../Presenters/ProfilePresenter";
import SignOutView from "../Views/SignOutView";

const Stack = createStackNavigator();

const ProfileViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="My Profile" component={ProfilePresenter}/>
            <Stack.Screen name="Sign out" component={SignOutView}/>
        </Stack.Navigator>
    );
}
export default ProfileViewNavigator;
