import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { Image, Text, View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../actions/Index';
import { Button, Spinner } from '../components/common';
import Logo from '../assets/images/Logo.png';

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }
  render() {
    return (
       <AnimatedLinearGradient speed={4000} >
         <KeyboardAvoidingView behavior="padding" style={styles.container} >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image style={styles.logoStyle} source={Logo} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeHolder="name@email.com"
                placeHolderTextColor='rgba(255,255,255,0.7)'
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeHolder="password"
                placeHolderTextColor='rgba(255,255,255,0.7)'
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
              <Text style={styles.errorTextStyle}>
                {this.props.error}
              </Text>
              <View style={styles.inputContainer}>
                {this.renderButton()}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </AnimatedLinearGradient>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  container: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  loginContainer: {
    height: 40,
    padding: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoStyle: {
    height: 70,
    width: 250
  },
  input: {
    height: 40,
    width: 200,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonStyle: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 15,
    height: 50,
    width: 100,
  },
  fbutton: {
    width: 200,
    borderRadius: 4
  }
});
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);
