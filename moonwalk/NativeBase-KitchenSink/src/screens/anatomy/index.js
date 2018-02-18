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

import styles from "./styles";
const backgroundImg = require("../../../assets/newtrip.png");

class Anatomy extends Component {
  render() {
    return (
      <Container style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={backgroundImg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
          {/*  <ImageBackground source={launchscreenLogo} style={styles.logo} /> */}
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
          {/*  <H3 style={styles.text}>App to showcase</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}>NativeBase components</H3>
            <View style={{ marginTop: 8 }} /> */}
          </View>
          <View style={{ marginTop: '76%', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Button success
              style={{ backgroundColor: "#3f58b8", borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '50.5%' }}
              onPress={() => this.props.navigation.navigate("Full")}
            >
              <Text style={{ fontSize: 20, textAlign: 'center' }}>NEW TRIP</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default Anatomy;
