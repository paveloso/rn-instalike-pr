import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';

import ImageSelector from '../components/ImageSelector';

import * as postActions from '../store/actions/post';

const UploadNewPostHeaderButton = (props) => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white' />
    );
};

const AddPostScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [description, setDescription] = useState('');

    const imageTakenHandler = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const uploadImage = async (imageUri, imageName) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        let ref = firebase.storage().ref().child('images/' + imageName);
        return ref.put(blob);
    }

    const addPostHandler = () => {
        console.log(description);
        const imageName = new Date().getTime();
        uploadImage(selectedImage, imageName).then(() => {
            console.log('good');
            // use redux dispatch here to create Post and send it to firebase
            // navigate to the main screen
            setIsLoading(true);
            // const imageReference = await 
            firebase.storage().ref('images/' + imageName).getDownloadURL().then(url => {
                dispatch(postActions.createPost(url, description)).then(() => {
                    setIsLoading(false);
                    props.navigation.navigate('Insta');
                }).catch((error) => {
                    setIsLoading(false);
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            });
            // dispatch(postActions.createPost(imageReference, description)).then(() => {
            //     setIsLoading(false);
            //     props.navigation.navigate('Insta');
            // }).catch((error) => {
            //     setIsLoading(false);
            //     console.log(error);
            // })
        }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        console.log('rendered')
        console.log('rendered desc ' + description)
        props.navigation.setParams({ upload: addPostHandler });
    }, [selectedImage, description])

    return (
        <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={80} style={styles.screen}>
            <ScrollView>
                <View style={{ paddingTop: 20 }}>
                    {/* <Text>this is AddPostScreen</Text> */}
                    <ImageSelector onImageTaken={imageTakenHandler} />
                    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                        <Text style={styles.descText}>Description</Text>
                    </View>
                    <View>
                        <TextInput style={styles.input} id="desc" 
                                    keyboardType='default' 
                                    autoCapitalize='sentences'
                                    onChangeText={value => setDescription(value)}
                                    value={description}
                                    placeholder='description goes here' />
                    </View>
                    {isLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color={Colors.primary} />
                            <Text>Uploading your post...</Text>
                        </View>
                    ) : <Text></Text>}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

AddPostScreen.navigationOptions = navData => {

    const uploadPost = navData.navigation.getParam('upload');

    return {
        headerTitle: 'Add Story',
        headerRight: () => <HeaderButtons HeaderButtonComponent={UploadNewPostHeaderButton} >
            <Item title='New Post' iconName='md-checkbox-outline' onPress={uploadPost} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {

    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 10,
        margin: 10,
        fontSize: 16
    },
    descText: {
        fontWeight: 'bold', 
        fontSize: 16
    }
});

export default AddPostScreen;