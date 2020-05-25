import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';

import Colors from '../constants/Colors';

import ImageSelector from '../components/ImageSelector';

const AddPostScreen = props => {

    const [selectedImage, setSelectedImage] = useState();

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
        uploadImage(selectedImage, 'test-image-name').then(() => {
            console.log('good');
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <View>
            <Text>this is AddPostScreen</Text>
            <ImageSelector onImageTaken={imageTakenHandler} />
            <Button title='Add Post' color={Colors.primary} onPress={addPostHandler} />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default AddPostScreen;