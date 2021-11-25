import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Highscores from "./Highscores";
import MapPresenterFile from "./MapPresenterFile";
import Feed from "./Feed";
import Progress from "./Progress";
import Powerups from "./Powerups";
import Collection from "./Collection";

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
                                } else if (route.name === 'Power Ups'){
                                    iconName = focused ? 'rocket' : 'rocket-outline'
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
                                tabBarActiveTintColor: 'tomato',
                                tabBarInactiveTintColor: 'black',
                            })}
                    >
                        <Tab.Screen name="Map" component={MapPresenterFile} options={{tabBarBadge: 3 }}/>
                        <Tab.Screen name="Progress" component={Progress} />
                        <Tab.Screen name="Feed" component={Feed} options={{tabBarBadge: 5 }}/>
                        <Tab.Screen name="High Score" component={Highscores} />
                        <Tab.Screen name="Power Ups" component={Powerups} />
                        <Tab.Screen name="Collectibles" component={Collection} />

                    </Tab.Navigator>

  );
}

export default Navigationbar;
