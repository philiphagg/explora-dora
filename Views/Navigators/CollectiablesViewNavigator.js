import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import CollectionPresenter from "../../Presenters/CollectionPresenter";
import EditPost from "../EditPost";

const Stack = createStackNavigator();

const CollectionViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="Collectibles" component={CollectionPresenter}/>
            <Stack.Screen name="Edit Post" component={EditPost}/>
        </Stack.Navigator>
    );
}
export default CollectionViewNavigator;
