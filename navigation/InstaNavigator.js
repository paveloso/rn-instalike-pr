import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import InstaScreen from '../screens/InstaScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MyInstaScreen from '../screens/MyInstaScreen';
import SettingsScreen from '../screens/SettingsScreen';

const defaultInstaNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: 'white'
}

const InstaMainNavigator = createStackNavigator({
    Insta: {
        screen: InstaScreen
    },
    AddPost: {
        screen: AddPostScreen
    }
}, {
    defaultNavigationOptions: defaultInstaNavigationOptions
});

const MyInstaNavigator = createStackNavigator({
    MyInsta: MyInstaScreen
}, {
    defaultNavigationOptions: defaultInstaNavigationOptions
});

const SettingsNavigator = createStackNavigator({
    Settings: SettingsScreen
}, {
    defaultNavigationOptions: defaultInstaNavigationOptions
});

const tabScreenConfig = {
    InstaTab: {
        screen: InstaMainNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-people' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.primary,
            tabBarLabel: 'Stories'
        }
    },
    MyInstaTab: {
        screen: MyInstaNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-person' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.primary,
            tabBarLabel: 'Me'
        }
    },
    SettingsTab: {
        screen: SettingsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-settings' size={25} color={tabInfo.tintColor} />);
            },
            tabBarColor: Colors.primary,
            tabBarLabel: 'Settings'
        }
    },
};

const InstaTabNavigator = createBottomTabNavigator(
    tabScreenConfig,
    {
        tabBarOptions: {
            activeTintColor: Colors.primary
        }
    } 
);

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthScreen,
    Insta: InstaTabNavigator
    // here goest main app navigator
})

export default createAppContainer(MainNavigator);