import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PostListItemShort = props => {
    const fixedUrl = props.imageUrl.toString().replace('&', '&amp;');
    return (
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.mainContainer}>
                {/* <View style={styles.imageContainer}> */}
                    <Image style={styles.image} source={{ uri: fixedUrl }} />
                {/* </View> */}
                <View style={{ width: '100%', paddingTop: 20 }}>
                    <Text style={styles.authorText}>{props.authorId}</Text>
                {/* </View>
                <View> */}
                    <Text>{props.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 20,
        margin: 20,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        // borderRadius: 10,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 300
    },
    authorText: {
        fontWeight: 'bold'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default PostListItemShort;