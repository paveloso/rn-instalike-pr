import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';

const StartupScreen = props => {

    const dispatch = useDispatch();

    // this runs after the component is loaded/mounted
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                console.log('1')
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expirationDate } = transformedData;
            console.log(token)
            console.log(userId)
            console.log(expirationDate)

            const expirationDateDate = new Date(expirationDate);

            if (expirationDateDate <= new Date() || !token || !userId) {
                console.log('2')
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expirationDateDate.getTime() - new Date().getTime();

            console.log('3')
            props.navigation.navigate('Insta');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;