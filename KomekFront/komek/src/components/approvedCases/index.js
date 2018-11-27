import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from "../../actions/userActions";
import RaisedButton from 'material-ui/RaisedButton'
import CaseList from '../newCases/CaseList';
import './style.css';
import '../../styles/main.css'
import _ from 'lodash';

class _ApprovedCases extends Component{

  componentWillMount() {
    this.props.onGetAllCases();
  }

  handleCaseClick = (data) => {
    console.log(data);
  }

  render(){
    return(
      <div className="wrapper">
        <div className="inner-wrapper">
          <div className="title-center title">Кейсы переданные департаментам на рассмотрение</div>
          <div>
            {this.props.allCases.map((c, ix) => {
              if(c.is_approved_by_social_worker)
                return <CaseList data={c} key={ix} onClick={this.handleCaseClick}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allCases: state.user.haveGotAllCases
})

const mapDispatchToProps = {
  onGetAllCases: userActions.getAllCases
};

const ApprovedCases = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ApprovedCases);

export default ApprovedCases;