import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Picker, SectionList, StyleSheet, Text, View } from 'react-native';

export default class TripScreen extends Component {
_onPressButton() {
    Alert.alert('You tapped the button!')
  }
state = {gender: 'female'}
updateGender = (gender) => this.setState({gender: gender})

  render() {
    return(
      <View style= {styles.tripPage}>
        <Text style= {styles.tripHeader} >My Trip</Text>
        <View style= {styles.tripCriteriaView}>
          <Text>Preferred Walking Buddy</Text>
            <View style={styles.individualCriteriaView}>
              <Text style= {styles.criteriaText}>Gender</Text> 
              <Picker 
                selectedValue={this.state.gender}
                onValueChange={this.updateGender}>
                <Picker.Item label='female' value='female' />
                <Picker.Item label='male' value='male' />
              </Picker>
              <Text style= {styles.criteriaText}>{this.state.gender}</Text>
            </View>
            <View>
              <Text style= {styles.criteriaText}>Group Size</Text>
            </View>
          <Text>Trip Information</Text>
            <View>
              <Text style= {styles.criteriaText}>Time</Text>
              <Text style= {styles.criteriaText}>Flexibility</Text>
              <Text style= {styles.criteriaText}>Destination</Text>
            </View>
          <Text>Identifiable Clothing Item</Text>
            <View>
            </View>
          <View style={styles.buttonContainer}>
            <Button 
              onPress = {this._onPressButton}
              title="Book Trip"
            />
          </View>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  tripPage: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  tripHeader: {
    padding: 10,
    fontSize: 22,
    textAlign: 'center'
  },
  tripCriteriaView:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  individualCriteriaView:{
    flexDirection: 'row'
  },
  criteriaText:{
    padding: 5,
    fontSize: 12
  },
  buttonContainer:{

  }
})