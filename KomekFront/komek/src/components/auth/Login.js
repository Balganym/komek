import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import HandleLogin from './HandleLogin';

import LinearProgress from 'material-ui/LinearProgress';

import '../../styles/Styles.css';
import './Auth.css';

import * as actions from "../../actions/authActions";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: '',
    }

    this.handlePassword = this.handlePassword.bind(this);
  }
 
  handlePassword(newData){
    let data = {
      username: newData.username,
      password: newData.password
    };
    this.props.onLoginClick(data);
  }
  
  renderProgress(){
    if(this.props.isLoading)
      return <LinearProgress mode="indeterminate" 
        className="linearProgress"/>
    return null;
  }
  renderBody() {

    const data = {
      username: this.state.username,
      password: this.state.password
    }

    return (
      <HandleLogin
        onSubmit={this.handlePassword}
        data={data}
        />
    )
  }
  
  render() {
    return (
      <div className="content-auth">
        <div className="auth-cart">
          <div className="auth-logo">
          </div>
          <div className="auth-body">
            {this.renderBody()}
          </div>
        </div>
        {this.renderProgress()}
      </div>
    )  
  }
}

const mapStateToProps = (state) => ({
  isLoginExist: state.auth.isLoginExist,
  isLoading: state.auth.isLoggingIn,
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = {
  onLoginClick: actions.login,
  checkLogin: actions.checkLogin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
