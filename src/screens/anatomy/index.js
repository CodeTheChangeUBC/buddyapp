import React, {Component} from "react";

const FBSDK = require("react-native-fbsdk");
import {View, TextInput} from "react-native";

const {
    LoginButton,
} = FBSDK;

class RegisterComponent extends Component {
    private static EMAIL_PLACEHOLDER = "EMAIL@UBC.CA";
    private static PHONE_PLACEHOLDER = "1-800-YOUR-NUMBER";
    private sendEmail(email) {
        fetch('http://localhost/email',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            {
                body: JSON.stringify({
                    firstParam: email
                })
            })
        // handle response codes here
    }

    private sendTextMsg(phone_num) {
        fetch('http://localhost/text',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
            {
                body: JSON.stringify({
                    firstParam: phone_num
                })
            });
        // handle response codes here
    }
    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={"public_profile"}
                    </>
                <TextInput style={styles.input}
                           multiline={true}
                           autocapitalize={true}
                           underlineColorAndroid="transparent"
                           placeholder={RegisterComponent.EMAIL_PLACEHOLDER}
                           returnKeyType={'go'}
                           placeholderTextColor="#ffffff"
                           keyboardType={'email-address'}
                           onChangeText={this.sendEmail}/>
                <TextInput style={styles.input}
                           underlineColorAndroid="transparent"
                           returnKeyType={'go'}
                           placeholder={RegisterComponent.PHONE_PLACEHOLDER}
                           placeholderTextColor="#ffffff"
                           keyboardType={'phone-pad'}
                           autoCapitalize="none"
                           onChangeText={this.sendTextMsg}/>
            </View>
        );
    }
}
export default RegisterComponent;
