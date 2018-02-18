import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import {
  H3,
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from "./styles";

import {BubblesLoader} from 'react-native-indicator';

const backgroundImg = require("../../../assets/searchScreen.png");

class Block extends Component {

  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.props.navigation.state.params
    }
  }
  
  // Params for request to API are in props.navigation.state.params, needs to be sent via post request
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      console.log(this.props.navigation.state.params)
      this.props.navigation.navigate("Rounded",responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={backgroundImg} style={styles.imageContainer}>
          <Grid>
            <Row size={35}/>
            <Row size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <BubblesLoader color={"#FFF"} size={100} dotRadius={30} style={{ justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%' }}/>
            </Row>
            <Row size={10}/>
            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button success
                style={{ backgroundColor: "#b52a3b", borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '50%', height: '100%' }}
                onPress={() => this.props.navigation.navigate("Anatomy")}
              >
                <Text style={{ fontSize: 20, textAlign: 'center' }}>CANCEL</Text>
              </Button>
            </Row>
            <Row size={25}/>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}

export default Block;
