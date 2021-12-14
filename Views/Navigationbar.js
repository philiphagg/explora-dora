import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useSelector} from "react-redux";

import MapViewNavigator from "./Navigators/MapViewNavigator";
import CollectionViewNavigator from "./Navigators/CollectiablesViewNavigator";
import ProgressViewNavigator from "./Navigators/ProgressViewNavigation";
import FeedViewNavigator from "./Navigators/FeedViewNavigator";
import HighscoresViewNavigator from "./Navigators/HighscoresViewNavigator";
import ProfileViewNavigator from "./Navigators/ProfileViewNavigator";


const Tab = createBottomTabNavigator();

function Navigationbar() {
    const theme = useSelector((state) => state.theme.value.theme);
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'MapView') {
                        iconName = focused
                            ? 'compass'
                            : 'compass-outline';
                    } else if (route.name === 'ProgressView') {
                        iconName = focused ? 'earth' : 'earth-outline';
                    } else if (route.name === 'ProfileView') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (route.name === 'CollectiblesView') {
                        iconName = focused ? 'trophy' : 'trophy-outline'
                    } else if (route.name === 'HighScoreView')
                        iconName = focused ? 'reader' : 'reader-outline'
                    else if (route.name === 'FeedView')
                        iconName = focused ? 'newspaper' : 'newspaper-outline'

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.colors.text,
                headerShown: false,
            })}
        >
            <Tab.Screen name="MapView" component={MapViewNavigator} options={{tabBarBadge: 3}}/>
            <Tab.Screen name="ProgressView" component={ProgressViewNavigator}/>
            <Tab.Screen name="FeedView" component={FeedViewNavigator} options={{tabBarBadge: 5}}/>
            <Tab.Screen name="HighScoreView" component={HighscoresViewNavigator}/>
            <Tab.Screen name="CollectiblesView" component={CollectionViewNavigator}/>
            <Tab.Screen name="ProfileView" component={ProfileViewNavigator}/>
        </Tab.Navigator>
    );
}

export default Navigationbar;
