import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CollectionPresenter from "../Presenters/CollectionPresenter";
import EditPost from "../Views/EditPost";

const Stack = createStackNavigator();

const CollectionViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="My Collection" component={CollectionPresenter}/>
            <Stack.Screen name="Edit Post" component={EditPost}/>
        </Stack.Navigator>
    );
}
export default CollectionViewNavigator;
