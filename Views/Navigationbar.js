import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Highscores from "./Highscores";
import MapPresenterFile from "./MapPresenterFile";
import Feed from "./Feed";
import Progress from "./Progress";
import Profile from "./Profile";
import Collection from "./Collection";
import store from "../Redux/Store";
import {useSelector} from "react-redux";
import Login from "./Login";
import AddPost from "./AddPost";
import CameraView from "./Components/camera";

//import {useSelector} from "react-redux";
//const theme = useSelector((state) => state.theme.value.settings);

//const theme = useSelector((state) => state.theme.settings);
//theme={store.getState().theme.settings}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
function Navigationbar(){
      return (

                    <Tab.Navigator
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === 'Map') {
                                    iconName = focused
                                    ? 'compass'
                                    : 'compass-outline';
                                } else if (route.name === 'Progress') {
                                    iconName = focused ? 'earth' : 'earth-outline';
                                } else if (route.name === 'Profile'){
                                    iconName = focused ? 'person' : 'person-outline'
                                }
                                else if (route.name === 'Collectibles'){
                                    iconName = focused ? 'trophy' : 'trophy-outline'
                                } else if (route.name === 'High Score')
                                    iconName = focused ? 'reader' : 'reader-outline'
                                else if (route.name === 'Feed')
                                    iconName = focused ? 'newspaper' : 'newspaper-outline'

                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;
                                },
                                tabBarActiveTintColor: '#4E9F3D',
                                tabBarInactiveTintColor: '#D8E9A8',
                            })}
                    >
                        <Tab.Screen name="Map" component={MapPresenterFile} options={{tabBarBadge: 3 }}/>
                        <Tab.Screen name="Progress" component={AddPost} />
                        <Tab.Screen name="Feed" component={Feed} options={{tabBarBadge: 5 }}/>
                        <Tab.Screen name="High Score" component={CameraView} />
                        <Tab.Screen name="Collectibles" component={Collection} />
                        <Tab.Screen name="Profile" component={Profile} />

                    </Tab.Navigator>

  );
}

export default Navigationbar;
