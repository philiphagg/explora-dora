import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "./Feed";
import Progress from "./Progress";
import Profile from "./Profile";
import {useSelector} from "react-redux";
import FeedPresenter from "../Presenters/feedPresenter";
import HighScorePresenter from "../Presenters/HighScorePresenter";
import ProfilePresenter from "../Presenters/ProfilePresenter";
import ProgressPresenter from "../Presenters/ProgressPresenter";
import MapPresenter from "../Presenters/MapPresenter";
import CollectionPresenter from "../Presenters/CollectionPresenter";

const Tab = createBottomTabNavigator();

function Navigationbar() {
    const theme = useSelector((state) => state.theme.value.theme);
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Map') {
                        iconName = focused
                            ? 'compass'
                            : 'compass-outline';
                    } else if (route.name === 'Progress') {
                        iconName = focused ? 'earth' : 'earth-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline'
                    } else if (route.name === 'Collectibles') {
                        iconName = focused ? 'trophy' : 'trophy-outline'
                    } else if (route.name === 'High Score')
                        iconName = focused ? 'reader' : 'reader-outline'
                    else if (route.name === 'Feed')
                        iconName = focused ? 'newspaper' : 'newspaper-outline'

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: theme.colors.text,
                tabBarInactiveTintColor: theme.colors.text,
            })}
        >
            <Tab.Screen name="Map" component={MapPresenter} options={{tabBarBadge: 3}}/>
            <Tab.Screen name="Progress" component={ProgressPresenter}/>
            <Tab.Screen name="Feed" component={FeedPresenter} options={{tabBarBadge: 5}}/>
            <Tab.Screen name="High Score" component={HighScorePresenter}/>
            <Tab.Screen name="Collectibles" component={CollectionPresenter}/>
            <Tab.Screen name="Profile" component={ProfilePresenter}/>

        </Tab.Navigator>

    );
}

export default Navigationbar;
