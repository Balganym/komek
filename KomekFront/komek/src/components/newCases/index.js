import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from "../../actions/userActions";
import CaseList from './CaseList';
import UpdateCase from '../updateCase';
import _ from 'lodash';
import './style.css'
import { BrowserRouter as Redirect } from 'react-router-dom';


class NewCases extends Component{

  constructor(props) {
    super(props);

    this.state={
      redirect: false
    }
  }

  componentWillMount() {
    this.props.onGetAllCases;
  }

  handleCaseClick = (data) => (
    this.setState({redirect: true})
  )

  _redirect = () => {
    if(this.state.redirect) {
      return (<Redirect to={{
        pathname: '/CreateCase',
        from: '/NewCases'}}/>)
    }
  }

  render(){
    return(
      <div className="wrapper">
        <div className="inner-wrapper">
          <div className="title-center title">Открытые кейсы</div>
          <div>
            {this.props.allCases.map((c, ix) => {
              if(!c.is_approved_by_social_worker)
                return <CaseList data={c} key={ix} onClick={this.handleCaseClick}/>
            })}
          </div>
        </div>
        {this._redirect}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allCases: state.user.haveGotAllCases,
  haveGotPiorities: state.user.haveGotPiorities
})

const mapDispatchToProps = {
  onGetPrior: userActions.getPriorities
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCases);