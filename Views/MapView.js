import { createStackNavigator } from '@react-navigation/stack';
import MapPresenterFile from "./MapPresenterFile";
import AddPost from "./AddPost";
import Camera from "./Components/camera";



const Stack = createStackNavigator();

function MapView() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Map" component={MapPresenterFile} />
            <Stack.Screen name="posts" component={AddPost} />
            <Stack.Screen name="photo" component={Camera} />
        </Stack.Navigator>

    );
}
export default MapView;
