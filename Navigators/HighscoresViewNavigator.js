import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HighScorePresenter from "../Presenters/HighScorePresenter";

const Stack = createStackNavigator();

const HighscoresViewNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name="High Score" component={HighScorePresenter}/>
        </Stack.Navigator>
    );
}
export default HighscoresViewNavigator;
