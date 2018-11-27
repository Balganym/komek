import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } 
  from 'react-router-dom';
import MediaQuery from 'react-responsive';

import * as constants from "../constants/constants";

import Login from '../components/auth/Login';
import Header from '../components/header/Header';
import CreateCase from '../components/createCase';
import Page from '../components/page';
import UpdateCase from '../components/updateCase';
import NewCases from '../components/newCases';
import ApprovedCases from '../components/approvedCases';

import NoMatch from './NoMatch';

class _Main extends Component {
  render() {
    let isLoggedIn = { isLoggedIn: this.props.isLoggedIn };
    return (
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Login} 
            {...isLoggedIn}/>
          
          <UserRoute exact path="/" 
            component={Page} isCreateCase={true} {...isLoggedIn}/>

          <UserRoute exact path="/createCase" 
            component={CreateCase} isCreateCase={true} {...isLoggedIn}/>

          <UserRoute exact path="/newCases"
            component={NewCases} {...isLoggedIn}/>

          <UserRoute exact path="/approvedCases"
            component={ApprovedCases} {...isLoggedIn}/>

          <UserRoute exact path='/updateCase'
            component={UpdateCase} {...isLoggedIn} />

          <HeaderRoute name="not-found" component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}

export const HeaderRoute = (props) => {
  let { component: Component, ...rest } = props;
  return (
    <Route {...rest} component={props => (
      <div className="main-wrapper">
        <Header {...props} />
        <Component {...props}/>
      </div>
    )} />
  )
}

export const AuthRoute = (props) => {
  let { component: Component, isLoggedIn, ...rest } = props;
  return (
    isLoggedIn ? <Redirect to={{
          pathname: '/',
          from: props.location.pathname,
        }}/> : <Component {...props} />
  )
}

export const UserRoute = (props) => {
  let { component: Component, isLoggedIn, isCreateCase, ...rest } = props;
  return (
    <HeaderRoute {...rest} component={props => (
      isLoggedIn || isCreateCase ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          from: props.location.pathname,
        }}/>
      )
  )} />
)}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {}

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Main);

export default MainPage;
