import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ImageSelector from '../components/ImageSelector';

const AddPostScreen = props => {
    return (
        <View>
            <Text>this is AddPostScreen</Text>
            <ImageSelector />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default AddPostScreen;