import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';

import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import InstaScreen from '../screens/InstaScreen';
import AddPostScreen from '../screens/AddPostScreen';

const defaultInstaNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: 'white'
}

const InstaMainNavigator = createStackNavigator({
    Insta: InstaScreen,
    AddPost: AddPostScreen
}, {
    defaultNavigationOptions: defaultInstaNavigationOptions
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthScreen,
    Insta: InstaMainNavigator
    // here goest main app navigator
})

export default createAppContainer(MainNavigator);