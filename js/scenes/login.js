import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Body, Content, Thumbnail, Toast, Form, Item, Label, Icon, Input, Text, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/login';
import * as NavActions from '../actions/navigation';

class Login extends Component {
  static navigationOptions = {
    header: null,
  }
  
  constructor(props){
    super(props);
    this.state = {
        email: this.props.email || '',
        password: '',
        pendingRequest: false,
        errorMessage: '',
        jwt: '',
        showToast: false
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({ pendingRequest: nextProps.pendingRequest, errorMessage: nextProps.errorMessage, showToast: nextProps.showToast})
  }

  _handleSubmit(email, password) {
    if (email === '' || password === ''){
      Toast.show({
        text: 'Usuário/Senha não informado!',
        position: 'bottom',
        buttonText: 'Okay'
      });
      return;
    }
    this.props.loginActions.login(email, password);
  }

  _showErrorMessage(message){
    if (message !== ''){
      Toast.show({
        text: message,
        type: 'warning',
        duration: 10000,
        position: 'bottom',
        buttonText: 'Okay'
      });
    }
  }

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: 'white'}} padder>
          <View>
            <Image style={{flex: 1, alignSelf: 'center', marginTop: 20, width: 140, height: 140}} source={require('../../images/login_logo1.png')} />
            <Text style={{flex: 1, alignSelf: 'center'}}>Bzaar</Text>
          <Form>
            <Item floatingLabel>
              <Label>E-mail</Label>
              <Icon active name='person' />
              <Input
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
               />
            </Item>
            <Item>
              <Icon active name='lock' />
              <Input secureTextEntry
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
               />
            </Item>
            {this.state.pendingRequest ? (<Spinner />) :
            <View>
              <Button block dark onPress={() => this._handleSubmit(this.state.email, this.state.password)}>
                <Text>Sign-in</Text>
              </Button>
              <Button transparent block dark onPress={() => this.props.navActions.userRegister()}>
                <Text>Sign-up</Text>
              </Button>
            </View>
            }
          </Form>
          </View>
        </Content>
        <Toast
          showToast="true"
          buttonText="Okay"
          buttonPress={()=> this.setState({
            showToast: !this.state.showToast
          })}
          position="bottom">
          <Text>Teste</Text>
        </Toast>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { 
    pendingRequest: state.login.pendingRequest,
    errorMessage: state.login.errorMessage,
    showToast: state.login.showToast,
    jwt: state.login.jwt,
   };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(Actions, dispatch),
    navActions: bindActionCreators(NavActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);