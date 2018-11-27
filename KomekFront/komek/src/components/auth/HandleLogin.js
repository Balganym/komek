import React, { Component } from 'react';
import { connect } from 'react-redux';

// import VTextField from '../elements/VTextField';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class _HandleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({error: nextProps.errorMessage});
  }
  handleLoginChange(e){
    this.setState({username: e.target.value, error: ''});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value, error: ''});
  }

  handleEnter(target) {
    if(target.charCode === 13){
      this.handleSubmit();
    }
  }
  handleSubmit(){
    const {username, password} = this.state;
    this.props.onSubmit({username: username, password: password});
  }
  render(){
    var isDisabled = this.props.isLoading || this.state.username === "";
    return (
      <div>
        <div className="auth-title">
            Добро пожаловать
          </div>
        <TextField id="login"
          autoFocus
          fullWidth={true}
          name="username"
          floatingLabelText="Введите имя пользователя"
          value={this.state.username}
          onChange={this.handleLoginChange}
          onKeyPress={this.handleEnter}
        />
        <TextField id="password"
          fullWidth={true}
          name="password"
          floatingLabelText="Введите ваш пароль"
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
          type="password"
          onKeyPress={this.handleEnter.bind(this)}
          errorText={this.state.error}
        />
        <div className="auth-submit">
          <div>
          </div>
          <FlatButton className="next-btn"
            label="Войти"
            primary={true}
            onClick={this.handleSubmit}
            disabled={isDisabled} />
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoggingIn,
})

const mapDispatchToProps = {}

const HandleLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HandleLogin);

export default HandleLoginPage;
