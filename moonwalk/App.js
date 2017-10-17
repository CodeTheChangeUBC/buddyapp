import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TripScreen from './TripScreen'

export default class App extends React.Component {
  render() {
    return (
      <TripScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
