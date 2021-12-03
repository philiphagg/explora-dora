import { createStackNavigator } from '@react-navigation/stack';
import MapPresenterFile from "./MapPresenterFile";
import AddPost from "./AddPost";
import Camera from "./Components/camera";
import * as React from 'react';


const Stack = createStackNavigator();

const MapViewComp = () =>  {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Map" component={MapPresenterFile} />
            <Stack.Screen name="Claim Landmark" component={AddPost} />
            <Stack.Screen name="Take Picture" component={Camera} />
        </Stack.Navigator>
    );
}
export default MapViewComp;
