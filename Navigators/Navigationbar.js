import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useSelector} from "react-redux";

import MapViewNavigator from "./MapViewNavigator";
import CollectionViewNavigator from "./CollectiablesViewNavigator";
import ProgressViewNavigator from "./ProgressViewNavigation";
import FeedViewNavigator from "./FeedViewNavigator";
import HighscoresViewNavigator from "./HighscoresViewNavigator";
import ProfileViewNavigator from "./ProfileViewNavigator";


const Tab = createBottomTabNavigator();

function Navigationbar() {
    const theme = useSelector((state) => state.theme.value.theme);
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Explore') {
                        iconName = focused
                            ? 'compass'
                            : 'compass-outline';
                    } else if (route.name === 'Progress') {
                        iconName = focused ? 'earth' : 'earth-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (route.name === 'Collection') {
                        iconName = focused ? 'trophy' : 'trophy-outline'
                    } else if (route.name === 'Highscores')
                        iconName = focused ? 'reader' : 'reader-outline'
                    else if (route.name === 'Feed')
                        iconName = focused ? 'newspaper' : 'newspaper-outline'

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.colors.text,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Explore" component={MapViewNavigator} />
            <Tab.Screen name="Progress" component={ProgressViewNavigator}/>
            <Tab.Screen name="Feed" component={FeedViewNavigator} />
            <Tab.Screen name="Highscores" component={HighscoresViewNavigator}/>
            <Tab.Screen name="Collection" component={CollectionViewNavigator}/>
            <Tab.Screen name="Profile" component={ProfileViewNavigator}/>
        </Tab.Navigator>
    );
}

export default Navigationbar;
