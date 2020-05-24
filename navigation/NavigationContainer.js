import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import InstaNavigator from './InstaNavigator';

const NavigationContainer = props => {
    const navigationReference = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navigationReference.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
        }
    }, [isAuth])

    return (
        <InstaNavigator ref={navigationReference} />
    );
};

const styles = StyleSheet.create({

});

export default NavigationContainer;