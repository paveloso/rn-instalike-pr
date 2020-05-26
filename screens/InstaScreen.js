import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

import PostListItemShort from '../components/PostListItemShort';

import Colors from '../constants/Colors';

import * as authActions from '../store/actions/auth';
import * as postActions from '../store/actions/post';

const MakeNewPostHeaderButton = (props) => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white' />
    );
};

const InstaScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const posts = useSelector(state => state.post.posts);

    const dispatch = useDispatch();

    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postActions.fetchPosts());
        } catch (err) {
            console.log(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    useEffect(() => {
        setIsLoading(true);
        loadPosts().then(() => {
            setIsLoading(false);
        });
        loadPosts();
    }, [dispatch, loadPosts])

    const logoutHandler = () => {
        dispatch(authActions.logout());
        // props.navigation.navigate('Auth');
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    };

    return (
        <View>
            <View>
                <Text>this is InstaScreen</Text>
                <Button title='Logout' onPress={logoutHandler} color={Colors.secondary} />
                {/* <PostListItemShort style={{ padding: 10 }} imageUrl='https://firebasestorage.googleapis.com/v0/b/rn-instalike-pr.appspot.com/o/images%2F1590502598481?alt=media&amp;token=b0df49a5-e6f2-4ac5-a2ce-ea74c3ebe6e5' authorId='2341' description='asfsgfsdgs' /> */}
            </View>
            <FlatList data={posts} 
                        onRefresh={loadPosts}
                        refreshing={isRefreshing}
                        keyExtractor={item => item.id} 
                        renderItem={itemData => <PostListItemShort 
                                                    imageUrl={itemData.item.imageUrl}
                                                    authorId={itemData.item.authorId}
                                                    description={itemData.item.description}
                                                    onSelect={() => {}} />} 
            />
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default InstaScreen;