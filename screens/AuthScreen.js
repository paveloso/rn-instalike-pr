import React from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';

const AuthScreen = props => {
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
                            onValueChange={() => {}}
                            initialValue=""
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
                            onValueChange={() => {}}
                            initialValue=""
                            placeholder='password goes here'
                            required
                            minLength={5} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={styles.buttonContainer}>
                            <Button title='Log in' color={Colors.primary} onPress={() => {}} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Sign up' color={Colors.secondary} onPress={() => {}} />
                        </View>
                    </View>
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