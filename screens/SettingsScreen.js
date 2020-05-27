import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';

const SettingsScreen = props => {

    const [uNickname, setUNickname] = useState('');

    const getNickname = async () => {
        const userNickname = await AsyncStorage.getItem('userNickname');
        const transformedData = JSON.parse(userNickname);
        const { nickname } = transformedData;
        setUNickname(nickname);
    }

    useEffect(() => {
        getNickname();
    })

    // const user = useSelector(state => state.user.currentUser);

    return (
        <View>
            <Text>this is SettingsScreen</Text>
            <Text>user's nickname is: {uNickname}</Text>
        </View>
    );
};

SettingsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Settings'
    }
}

const styles = StyleSheet.create({

});

export default SettingsScreen;