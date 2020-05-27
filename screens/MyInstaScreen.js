import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PostListItemShort from '../components/PostListItemShort';

import Colors from '../constants/Colors';

const MyInstaScreen = props => {

    const userPosts = useSelector(state => state.post.userPosts);

    return (
        <FlatList data={userPosts} 
                        // onRefresh={loadPosts}
                        // refreshing={isRefreshing}
                        keyExtractor={item => item.id} 
                        renderItem={itemData => <PostListItemShort 
                                                    imageUrl={itemData.item.imageUrl}
                                                    authorId={itemData.item.authorId}
                                                    description={itemData.item.description}
                                                    onSelect={() => {}} />} 
            />
    );
};

MyInstaScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Stories'
    }
}

const styles = StyleSheet.create({

});

export default MyInstaScreen;