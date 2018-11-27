import React, { Component } from 'react';
import { connect } from 'react-redux';
import CaseForm from './CaseForm';
import CreatedCase from './CreatedCase';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Redirect} from 'react-router-dom';
import * as actions from "../../actions/userActions";

import './style.css';

import _ from 'lodash';

class _CreateCase extends Component{

  constructor(props) {
    super(props);

    this.state = {
      cases: []
    }
  }

  componentWillMount() {
    this.props.onGetPriorities();
    this.props.onGetAllDepartments();
    this.props.onGetAllCases();
  }

  handleSubmit = () => {
    const data = {
      cases: this.state.cases
    }
    this.props.onCreateCases(data);
    if (this.props.isCasesCreated) {
      this.setState({cases: []});
      return <Redirect to={{
        pathname: '/',
        from: '/createCase',
      }}/>
    }
  }

  handleUpdate = () => {
    const data = {
      cases: this.state.cases
    }
    this.props.onUpdateCases(data);
    if (this.props.areCasesUpdated) {
      this.setState({cases: []});
      return <Redirect to={{
        pathname: '/',
        from: this.props.location.pathname,
      }}/>
    }
  }

  _addNewCase = (_case) => {
    const newCases = this.state.cases.slice();
    newCases.push(_case);
    this.setState({cases: newCases})
  }

  _updateCase = (_case) => {
    const cases = this.state.cases.filter((val, ix, arr) => (val.parent_case !== _case.parent_case));

    this.props.allCases.map(cs => {
      if(cs.iin === _case.iin) {
        cases.push(_case);
      } else if (cs.parent_case === _case.parent_case) {
        const elem = cs;
        elem.place = _case.place;
        elem.datetime = _case.datetime;
        cases.push(elem);
      }
    })

    this.setState({cases});
  }

  render(){
    const data = this.props.location.data;
    const isData = Boolean(data);

    return(
      <div className="createCases-wrapper">
        <div className="body">
          <CaseForm onNewCaseAdd={this._addNewCase} data={this.props.location.data}
            onCaseUpdate={this._updateCase}
            departments={this.props.departments} priorities={this.props.priorities}/>
          <div className="case-list">
            <div className="title-center form-title">{isData ? "Список членов данной семьи" :"Список добавляемых людей"}</div>
            <div>
              {!isData && this.state.cases.map((cs,ix) => {
                return <CreatedCase key={ix} data={cs} num={ix+1}/>
              })}
              {isData && this.props.allCases.map((cs, ix) => {
                if(data.parent_case === cs.parent_case) {
                  return <CreatedCase key={ix} data={cs} num={ix+1}/>
                }
              })}
            </div>
          </div>
        </div>
        <div className='btn-wrapper'>
          <RaisedButton 
            label={isData ? "Сохранить обновленные данные" : "Добавить список людей в базу"}
            primary={true}
            onClick={isData ? this.handleUpdate : this.handleSubmit}
            className="create-btn"
            disabled={this.state.cases.length === 0}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isCasesCreated: state.user.isCasesCreated,
  allCases: state.user.haveGotAllCases,
  priorities: state.user.haveGotPiorities,
  departments: state.user.haveGotAllDepartments,
  allCases: state.user.haveGotAllCases,
  areCasesUpdated: state.user.areCasesUpdated
})

const mapDispatchToProps = {
  onCreateCases: actions.createCases,
  onGetPriorities: actions.getPriorities,
  onGetAllDepartments: actions.getAllDepartments,
  onGetAllCases: actions.getAllCases,
  onUpdateCases: actions.updateCases
}

const CreateCase = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreateCase);

export default CreateCase;