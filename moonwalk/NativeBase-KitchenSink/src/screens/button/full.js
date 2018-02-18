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
const backgroundImg = require("../../../assets/form.png");
const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      gender: "male",
      size: "size1",
      time: "offset0",
      flex: "flex0",
      dest: "tp",
      cloth: "",
      results: {
        items: []
      }
    };
  }
  onValueChangeGender(value: string) {
    this.setState({
      gender: value
    });
  }
  onValueChangeSize(value: string) {
    this.setState({
      size: value
    });
  }
  onValueChangeTime(value: string) {
    this.setState({
      time: value
    });
  }
  onValueChangeFlex(value: string) {
    this.setState({
      flex: value
    });
  }
  onValueChangeDest(value: string) {
    this.setState({
      dest: value
    });
  }
  render() {
    return (
    <KeyboardAwareScrollView>
      <Container style={{ flex: 1, justifyContent: 'center' }}>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={backgroundImg} style={styles.imageContainer}>
        <Grid>
        <Row size={70}>
          <Col size={49}/>
          <Col size={34}>
          <Row size={19}/>
          <Row size={5} style={{ backgroundColor: "#a2a5edff" }}>          
            <Picker
                note
                mode="dropdown"
                style={{ width: 140, color: "#fff", height: 25 }}
                selectedValue={this.state.gender}
                onValueChange={this.onValueChangeGender.bind(this)}
                itemStyle={{ marginLeft: 0, paddingLeft: 20 }}
              >
                <Item label="Male" value="male" />
                <Item label="Female" value="female" />
                <Item label="Mixed" value="mixed" />
            </Picker>
          </Row>
          <Row size={1}/>
          <Row size={5} style={{ backgroundColor: "#a2a5edff" }}>
            <Picker
                note
                mode="dropdown"
                style={{ width: 140, color: "#fff", height: 25 }}
                selectedValue={this.state.size}
                onValueChange={this.onValueChangeSize.bind(this)}
                itemStyle={{ marginLeft: 0, paddingLeft: 20 }}
              >
                <Item label="1" value="size1" />
                <Item label="2" value="size2" />
                <Item label="3" value="size3" />
                <Item label="4+" value="size4" />
            </Picker>
          </Row>
          <Row size={13.5}/>
          <Row size={5} style={{ backgroundColor: "#a2a5edff" }}>
            <Picker
                note
                mode="dropdown"
                style={{ width: 140, color: "#fff", height: 25 }}
                selectedValue={this.state.time}
                onValueChange={this.onValueChangeTime.bind(this)}
                itemStyle={{ marginLeft: 0, paddingLeft: 20 }}
              >
                <Item label={moment().format('LT')} value="offset0" />
                <Item label={moment().add(15, 'minutes').format('LT')} value="offset1" />
                <Item label={moment().add(30, 'minutes').format('LT')} value="offset2" />
                <Item label={moment().add(45, 'minutes').format('LT')} value="offset3" />                
                <Item label={moment().add(60, 'minutes').format('LT')} value="offset4" />
            </Picker>
          </Row>
          <Row size={1.5}/>
          <Row size={5} style={{ backgroundColor: "#a2a5edff" }}>
            <Picker
                note
                mode="dropdown"
                style={{ width: 140, color: "#fff", height: 25 }}
                selectedValue={this.state.flex}
                onValueChange={this.onValueChangeFlex.bind(this)}
                itemStyle={{ marginLeft: 0, paddingLeft: 20 }}
              >
                <Item label="On time" value="flex0" />
                <Item label="5 min" value="flex1" />
                <Item label="10 min" value="flex2" />
                <Item label="15 min" value="flex3" />                
            </Picker>
          </Row>
          <Row size={1.5}/>
          <Row size={5} style={{ backgroundColor: "#a2a5edff" }}>
            <Picker
                note
                mode="dropdown"
                style={{ width: 140, color: "#fff", height: 25 }}
                selectedValue={this.state.dest}
                onValueChange={this.onValueChangeDest.bind(this)}
                itemStyle={{ marginLeft: 0, paddingLeft: 20 }}
              >
                <Item label="Totem Park" value="tp" />
                <Item label="Orchard Commons" value="oc" />
                <Item label="Place Vanier" value="pv" />
                <Item label="Student Nest" value="sn" />                
                <Item label="IKB Learning Center" value="ikb" />
            </Picker>
          </Row>
          <Row size={8.5}/>
          </Col>
          <Col size={17}/>
          </Row>
          <Row size={30}>
            <Col size={15}/>
            <Col size={70}>
              <Row size={25}/>
              <Row size={15} style={{ backgroundColor: "#a2a5edff" }}>
                <TextInput
                  style={{height: 30, fontSize: 18, flex: 1, color : "white", justifyContent: 'center', textAlign: "center", alignItems: "center"}}
                  onChangeText={(cloth) => this.setState({cloth})}
                  underlineColorAndroid="transparent"
                  value={this.state.cloth}
                />
              </Row>
              <Row size={19}/>
              <Row size={32} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button success
                  style={{ backgroundColor: "#3f58b8", borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderColor: '#fff', borderRadius: 0, width: '60%', height: '100%' }}
                  onPress={() => this.props.navigation.navigate("Block",{ user: 'Lucy' })}
                >
                  <Text style={{ fontSize: 20, textAlign: 'center' }}>BOOK TRIP</Text>
                </Button>
              </Row>
              <Row size={9}/>
            </Col>
            <Col size={15}/>
          </Row>
        </Grid>
        </ImageBackground>
      </Container>
    </KeyboardAwareScrollView>
    );
  }
}

export default Full;
