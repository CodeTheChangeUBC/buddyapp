import React, { Component } from "react";
import { ImageBackground, View, StatusBar, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
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
  Body,
  Picker,
  ListItem,
  Input,
  Item,
  Form
} from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";

import styles from "./styles";
const backgroundImg = require("../../../assets/found.png");

class Full extends Component {

  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.props.navigation.state.params
    }
  }

  // server return info can be found in prop.navigation.state.params
  render() {
    return (
    <KeyboardAwareScrollView>
      <Container style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={backgroundImg} style={styles.imageContainer}>
          <Grid>
            <Row size={89}/>
            <Row size={13} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button success
                style={{ backgroundColor: "#6284e6", borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '60%', height: '100%' }}
                onPress={() => this.props.navigation.navigate("Block",{ user: 'Lucy' })}
              >
                <Text style={{ fontSize: 20, textAlign: 'center' }}>ACCEPT BUDDY</Text>
              </Button>
            </Row>
            <Row size={5}/>
            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button success
                style={{ backgroundColor: "#3f58b8", borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '50%', height: '100%' }}
                onPress={() => this.props.navigation.navigate("Block",{ user: 'Lucy' })}
              >
                <Text style={{ fontSize: 20, textAlign: 'center' }}>SEARCH AGAIN</Text>
              </Button>
            </Row>
            <Row size={5}/>
            <Row size={10} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button success
                style={{ backgroundColor: "#b52a3b", borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '50%', height: '100%' }}
                onPress={() => this.props.navigation.navigate("Anatomy")}
              >
                <Text style={{ fontSize: 20, textAlign: 'center' }}>CANCEL</Text>
              </Button>
            </Row>
            <Row size={5}/>
          </Grid>
        </ImageBackground>
      </Container>
    </KeyboardAwareScrollView>
    );
  }
}

export default Full;
