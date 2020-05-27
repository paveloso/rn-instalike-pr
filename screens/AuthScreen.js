import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';

import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';

const AuthScreen = props => {

    console.log('render')

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error.message, [{ text: 'Ok'}]);
        }
    }, [error]);

    const authHandler = async (signUp) => {
        console.log('handler')
        let action;
        let uAction;
        if (signUp) {
            action = authActions.signup(email, password); 
            uAction = userActions.createUser();
            console.log('using signup')
        } else {
            action = authActions.login(email, password); 
            uAction = userActions.getUser();
            console.log('using login')
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            await dispatch(uAction);
            props.navigation.navigate('Insta');
        } catch (err) {
            setError(err);
            console.log(err)
            setIsLoading(false);
        }
    };
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient colors={['#a8ffc2', '#ffffa8', '#ffc6a8']} start={[0, 0]} end={[1, 1]} style={styles.gradient}>
                <View style={styles.centered}>
                    <View>
                        <Text>Email</Text>
                        <TextInput style={styles.input} id="email" 
                            keyboardType='email-address' 
                            autoCapitalize='none' 
                            errorMessage="Please enter a valid email address"
                            onChangeText={value => setEmail(value)}
                            value={email}
                            placeholder='email goes here'
                            required
                            email />
                    </View>
                    <View style={styles.textInputContainer}>
                        <Text>Password</Text>
                        <TextInput style={styles.input} id="password" 
                            keyboardType='default' 
                            secureTextEntry
                            autoCapitalize='none' 
                            errorMessage="Please enter a valid password" 
                            onChangeText={value => setPassword(value)}
                            value={password}
                            placeholder='password goes here'
                            required
                            minLength={5} />
                    </View>
                    {isLoading ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <ActivityIndicator size='small' color={Colors.primary} />
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 50 }}>
                        <View style={styles.buttonContainer}>
                            <Button title='Log in' color={Colors.primary} onPress={() => {
                                console.log('in')
                                setIsSignUp(false);
                                authHandler(false);
                                console.log('in')
                            }} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Sign up' color={Colors.secondary} onPress={() => {
                                console.log('in')
                                setIsSignUp(true);
                                authHandler(true);
                                console.log('in')
                            }} />
                        </View>
                    </View>
                    )}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centered: {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        // width: '100%',
        maxWidth: 400,
        minWidth: '80%',
        maxHeight: 400,
        // height: '100%'
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    buttonContainer: {
        marginTop: 10,
        width: '30%'
    },
    textInputContainer: {
        paddingTop: 10
    }
});

export default AuthScreen;