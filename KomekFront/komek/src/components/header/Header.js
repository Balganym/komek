import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {SERVER_URL } from '../../constants/server'

import * as authActions from '../../actions/authActions'

import './header.css';

const styles={
    labelStyle: {
      color: '#fff'
    },
    avatar: {
      margin: "0px",
      display: "inline"
    },
    ava_wrapper: {
      paddingTop: "40px",
      display: "inline"
    },
    profile: {
      height: "auto",
    },
    label: {
      textTransform: "initial",
      color: '#fff'
    },
};

let headerHeight='60px';

class _Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  renderIconElementCenter(){
    if(this.props.isLoggedIn){
      return (
        <div>
          <Link to="/newCases">
            <FlatButton 
              className="auth-btn" 
              label="Открытые кейсы" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
          <Link to="/approvedCases">
            <FlatButton 
              className="auth-btn" 
              label="Обрабатывающиеся кейсы" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
        </div>
      )
    } return;
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  renderIconElementRight() {
    if(this.props.isLoggedIn){
      const {user} = this.props;
      return(
        <div className="hmenu"> 
          <FlatButton
            onClick={this.handleTouchTap}
            labelStyle={styles.label}
            hoverColor={"none"}
            rippleColor={"none"}
            style={styles.profile}
            label={user.username}
            labelPosition="before"
          />
          <FlatButton
            label="Выйти"
            onClick={this.props.logout}
            labelStyle={styles.labelStyle}
            />
        </div>
      )
    }
    return (
      <div>
        <Link to="/login">
          <FlatButton 
            className="auth-btn" 
            label="войти" 
            labelStyle={ styles.labelStyle }
            />
        </Link>
      </div>
    )
  }

  render() {
    return(
      <AppBar
        iconElementLeft={ this.renderIconElementCenter() }
        iconElementRight={ this.renderIconElementRight() }
        style={{ 
          backgroundColor: '#2CACBD', 
          height: headerHeight,
          display: "inline-flex", 
          alignItems: "center", 
        }}
        className="header"
      />
    )
  }
}

const mapStateToProps=(state) => ({
  user: state.user.user,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps={
  logout: authActions.logout,
}

const Header=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Header);

export default Header;
