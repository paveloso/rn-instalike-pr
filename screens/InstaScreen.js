import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';

import * as authActions from '../store/actions/auth';

const MakeNewPostHeaderButton = (props) => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white' />
    );
};

const InstaScreen = props => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        // props.navigation.navigate('Auth');
    }

    return (
        <View>
            <Text>this is InstaScreen</Text>
            <Button title='Logout' onPress={logoutHandler} color={Colors.secondary} />
        </View>
    );
};

InstaScreen.navigationOptions = navData => {
    return {
        headerTitle: 'InstaLike',
        headerRight: () => <HeaderButtons HeaderButtonComponent={MakeNewPostHeaderButton} >
            <Item title='New Post' iconName='md-camera' onPress={() => {
                navData.navigation.navigate('AddPost');
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({

});

export default InstaScreen;