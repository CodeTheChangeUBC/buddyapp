import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Picker, SectionList, StyleSheet, Text, View, TextInput} from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import moment from 'moment';

export default class TripScreen extends Component {
   constructor() {
        super();
 
        this.state = {
            genderInputValue: 'Choose gender',
            groupSizeInputValue: 'Choose size of group',
            timeInputValue: 'Choose when to meet',
            flexibilityInputValue:'Choose how long to wait',
            destinationInputValue:'Choose your destination',
            clothingInputValue:'Describe what you are wearing'
        }
    }

_onPressButton() {
    Alert.alert('You tapped the button!')
  }



  render() {
    let index = 0;
        const genderData = [
            {key: index++, section: true, label: 'Gender'},
            {key: index++, label: 'female'},
            {key: index++, label: 'male'},
            {key: index++, label: 'any'}
        ];
        const groupSizeData = [
            {key: index++, section: true, label: 'Size'},
            {key: index++, label: '1'},
            {key: index++, label: '2'},
            {key: index++, label: '3'},
            {key: index++, label: '4+'}
        ];
        const timeData = [
            {key: index++, section: true, label: 'Time'},
            {key: index++, label: moment().format('LT')},
            {key: index++, label: moment().add(15, 'minutes').format('LT')},
            {key: index++, label: moment().add(30, 'minutes').format('LT')},
            {key: index++, label: moment().add(45, 'minutes').format('LT')},
            {key: index++, label: moment().add(60, 'minutes').format('LT')}
        ];
        const flexibilityData = [
            {key: index++, section: true, label: 'Flexibility'},
            {key: index++, label: 'Be on time'},
            {key: index++, label: '5 minutes max.'},
            {key: index++, label: '10 minutes max.'},
            {key: index++, label: '15 minutes max.'}
        ];
        const destinationData = [
            {key: index++, section: true, label: 'Destination'},
            {key: index++, label: 'Totem Park'},
            {key: index++, label: 'Orchard Commons'},
            {key: index++, label: 'Place Vanier'},
            {key: index++, label: 'Student Nest'},
            {key: index++, label: 'IKB'}
        ];
    return(
      <View style= {styles.tripPage}>
        <Text style= {styles.tripHeader} >My Trip</Text>
        <View style= {styles.tripCriteriaView}>
          <Text>Preferred Walking Buddy</Text>
            <View style={styles.individualCriteriaView}>
              <Text style= {styles.criteriaText}>Gender</Text> 
              <ModalPicker
                    data={genderData}
                    initValue="Select gender"
                    onChange={(option)=>{ this.setState({genderInputValue:option.label})}}>
                    <Text style={styles.criteriaText}> {this.state.genderInputValue} </Text>
                        
                </ModalPicker>
            </View>
            <View style={styles.individualCriteriaView}>
              <Text style= {styles.criteriaText}>Group Size</Text>
              <ModalPicker
                    data={groupSizeData}
                    initValue="Select size"
                    onChange={(option)=>{ this.setState({groupSizeInputValue:option.label})}}>
                    <Text style={styles.criteriaText}> {this.state.groupSizeInputValue} </Text>
                </ModalPicker>
            </View>
          <Text>Trip Information</Text>
            <View>
              <View style={styles.individualCriteriaView}>
                <Text style= {styles.criteriaText}>Time</Text>
                <ModalPicker
                    data={timeData}
                    initValue="Select time"
                    onChange={(option)=>{ this.setState({timeInputValue:option.label})}}>
                    <Text style={styles.criteriaText}> {this.state.timeInputValue} </Text>
                </ModalPicker>
              </View>
              <View style={styles.individualCriteriaView}>
                <Text style= {styles.criteriaText}>Flexibility</Text>
                <ModalPicker
                    data={flexibilityData}
                    initValue="Select flexibility"
                    onChange={(option)=>{ this.setState({flexibilityInputValue:option.label})}}>
                    <Text style={styles.criteriaText}> {this.state.flexibilityInputValue} </Text>
                </ModalPicker>
              </View>
              <View style={styles.individualCriteriaView}>
                <Text style= {styles.criteriaText}>Destination</Text>
                <ModalPicker
                    data={destinationData}
                    initValue="Select flexibility"
                    onChange={(option)=>{ this.setState({destinationInputValue:option.label})}}>
                    <Text style={styles.criteriaText}> {this.state.destinationInputValue} </Text>
                </ModalPicker>
              </View>
            </View>
          <Text>Identifiable Clothing Item</Text>
            <View>
              <TextInput
                style={styles.criteriaText}
                placeholder="Describe what you are wearing"
                onChangeText={(clothingInputValue) => this.setState({clothingInputValue})}
              />
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
    flexDirection: 'row',
  },
  criteriaText:{
    padding: 5,
    fontSize: 12,
    textAlign: 'center'
  },
  buttonContainer:{

  }
})