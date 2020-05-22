import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthScreen from '../screens/AuthScreen';
import InstaScreen from '../screens/InstaScreen';

const MainNavigator = createSwitchNavigator({
    Auth: AuthScreen,
    Insta: InstaScreen
    // here goest main app navigator
})

export default createAppContainer(MainNavigator);