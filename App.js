import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InstaNavigator from './navigation/InstaNavigator';

export default function App() {
  return (
    <InstaNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
