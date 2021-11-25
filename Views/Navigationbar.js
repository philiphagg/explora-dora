import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                                tabBarInactiveTintColor: 'gray',
                            })}
                    >
                        <Tab.Screen name="Map" component={HomeScreen} options={{tabBarBadge: 3 }}/>
                        <Tab.Screen name="Progress" component={SettingsScreen} />
                        <Tab.Screen name="Feed" component={HomeScreen} options={{tabBarBadge: 5 }}/>
                        <Tab.Screen name="High Score" component={HomeScreen} />
                        <Tab.Screen name="Power Ups" component={SettingsScreen} />
                        <Tab.Screen name="Collectibles" component={HomeScreen} />
                        
                    </Tab.Navigator>
                
  );
}

export default Navigationbar;