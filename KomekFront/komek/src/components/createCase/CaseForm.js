import React, { Component } from 'react';
import {connect} from 'react-redux';
import './style.css';
import '../../styles/main.css';
import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Department from './Department';

import _ from 'lodash';

export default class CaseForm extends Component{

  constructor(props) {
    super(props)

    this.state = {
      selectedDepart: 1,
      departs: [],
      departsToBack: [],
      needs: '',
      problems: '',
      datetime: '',
      place: '',
      toggle: false,
      fullName: '',
      iin: '',
      address: '',
      contacts: '',
      income: '',
      occupation: '',
      workPlace: '',
      mainAddress: '',
      healthCondition: '',
      status: '',
      description: ''
    }
  }

  updateCases = () => {
    const {fullName, iin, address, contacts,
      mainAddress, healthCondition, occupation,
      workPlace, status, description, income, problems, needs,
      place, datetime, toggle, departs, departsToBack} = this.state;

    const _case = {
      full_name: fullName,
      iin: iin,
      address: mainAddress,
      address_residential: address,
      contacts: contacts,
      status: status,
      place_of_work: workPlace,
      occupation: occupation,
      income: income,
      health_condition: healthCondition,
      description: description,
      place: place,
      needs: needs,
      datetime: datetime,
      problems: problems,
      departments: departsToBack,
      is_approved_by_social_worker: toggle,
      case_id: this.props.data.id
    }

    this.props.onCaseUpdate(_case)

    this.setState({
      fullName: '',
      iin: '',
      address: '',
      contacts: '',
      income: '',
      occupation: '',
      workPlace: '',
      mainAddress: '',
      healthCondition: '',
      status: '',
      description: '',
      departs: [],
      departsToBack: [],
      needs: '',
      problems: '',
      datetime: '',
      place: ''
    })
  }

  addToCases = () => {
    const {fullName, iin, address, contacts,
      mainAddress, healthCondition, occupation,
      workPlace, status, description, income} = this.state;
    const _case = {
      full_name: fullName,
      iin: iin,
      address: mainAddress,
      address_residential: address,
      contacts: contacts,
      status: status,
      place_of_work: workPlace,
      occupation: occupation,
      income: income,
      health_condition: healthCondition,
      description: description
    }

    this.props.onNewCaseAdd(_case)

    this.setState({
      fullName: '',
      iin: '',
      address: '',
      contacts: '',
      income: '',
      occupation: '',
      workPlace: '',
      mainAddress: '',
      healthCondition: '',
      status: '',
      description: ''
    })
  }

  componentWillMount() {
    if (this.props.data) {
      const {data} = this.props;
      this.setState({
        fullName: data.full_name,
        iin: data.iin,
        address: data.address,
        contacts: data.contacts,
        income: data.income,
        occupation: data.occupation,
        workPlace: data.place_of_work,
        mainAddress: data.address_residential,
        status: data.status,
        description: data.description,
        healthCondition: data.health_condition,
        toggle: data.toggle,
        needs: data.needs,
        problems: data.problems,
        departsToBack: [],
        place: data.place,
        datetime: data.datetime
      })
    }
  }

  handleToggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

  fullNameChanged = (e) => {
    this.setState({fullName: e.target.value})
  }
  iinChanged = (e) => {
    if(e.target.value.length <= 12) {
      this.setState({iin: e.target.value})
    }
  }
  addressChanged = (e) => {
    this.setState({address: e.target.value})
  }
  workPlaceChanged = (e) => {
    this.setState({workPlace: e.target.value})
  }
  contactsChanged = (e) => {
    this.setState({contacts: e.target.value})
  }
  incomeChanged = (e) => {
    this.setState({income: e.target.value})
  }
  occupationChanged = (e) => {
    this.setState({occupation: e.target.value})
  }
  mainAddressChanged = (e) => {
    this.setState({mainAddress: e.target.value})
  }
  healthConditionChanged = (e) => {
    this.setState({healthCondition: e.target.value})
  }
  statusChanged = (e) => {
    this.setState({status: e.target.value})
  }
  needsChanged = (e) => {
    this.setState({needs: e.target.value})
  }
  problemsChanged = (e) => {
    this.setState({problems: e.target.value})
  }
  placeChanged = (e) => {
    this.setState({place: e.target.value})
  }
  datetimeChanged = (e) => {
    this.setState({datetime: e.target.value})
  }
  descriptionChanged = (e) => {
    this.setState({description: e.target.value})
  }

  handlePriority = (priorityId, depart) => {
    let deps = this.state.departsToBack.slice();
    deps.map((d) => {
      if(d.department_id === depart.id) {
        d.priority_id = priorityId;
      }
    })

    this.setState({departsToBack: deps});
  }

  handleChangeDepartment = (event, index, department) => {
    let dps = this.state.departs.slice();
    let backdps = this.state.departsToBack.slice();

    if(dps.indexOf(this.props.departments[index]) === -1){
      dps.push(this.props.departments[index]);
      backdps.push({
        department_id: department,
        priority_id: 3
      });
    }

    this.setState({
      departs: dps,
      selectedDepart: department,
      departsToBack: backdps
    })
  }

  render(){

    const {fullName, iin, address, contacts,
      mainAddress, healthCondition, occupation,
      workPlace, status, description, income, needs,
      problems, departsToBack, place, datetime} = this.state;

    let canAdd = fullName.length > 0 && address.length > 0 &&
      iin.length > 0 && mainAddress.length > 0 &&
      occupation.length > 0 && contacts.length > 0 &&
      healthCondition.length > 0 && workPlace.length > 0 &&
      status.length > 0 && description.length > 0 &&
      income.length > 0;

    const isData = Boolean(this.props.data)

    if(isData) {
      canAdd = canAdd && needs.length > 0 && income.length > 0 &&
        datetime.length > 0 && problems.length > 0 && place.length > 0;
    }

    return(
      <div className='form-wrapper'>
        <div className='form-title title-center'>
          Пожалуйста, заполните необходимые данные
        </div>
        <div className='input-wrapper'>
          <Input
            id="fullName"
            fullWidth
            autoFocus
            floatingLabelText='ФИО'
            value={this.state.fullName}
            onChange={this.fullNameChanged}
            />
          <Input
            id="iin"
            fullWidth
            floatingLabelText='ИИН'
            value={this.state.iin}
            onChange={this.iinChanged}
            />
          <Input
            id="mainAddress"
            fullWidth
            floatingLabelText='Адрес прописки'
            value={this.state.mainAddress}
            onChange={this.mainAddressChanged}
            />
          <Input
            id="address"
            fullWidth
            floatingLabelText='Адрес проживания'
            value={this.state.address}
            onChange={this.addressChanged}
            />
          <Input
            id="workPlace"
            fullWidth
            floatingLabelText='Место работы'
            value={this.state.workPlace}
            onChange={this.workPlaceChanged}
            />
          <Input
            id="occupation"
            fullWidth
            floatingLabelText='Должность'
            value={this.state.occupation}
            onChange={this.occupationChanged}
            />
          <Input
            id="income"
            fullWidth
            floatingLabelText='Информация о доходах'
            value={this.state.income}
            onChange={this.incomeChanged}
            />
          <Input
            id="contacts"
            fullWidth
            floatingLabelText='Контакты'
            value={this.state.contacts}
            onChange={this.contactsChanged}
            />
          <Input
            id="outlined-full-width"
            fullWidth
            multiLine={true}
            floatingLabelText='Состояние здоровья'
            value={this.state.healthCondition}
            onChange={this.healthConditionChanged}
            />
          <Input
            id="description"
            fullWidth
            multiLine={true}
            floatingLabelText='Описание проблемы'
            value={this.state.description}
            onChange={this.descriptionChanged}
            />
          <Input
            id="status"
            fullWidth
            floatingLabelText='Статус'
            value={this.state.status}
            onChange={this.statusChanged}
            />
          {isData && <Input
            id="place"
            fullWidth
            floatingLabelText='Адрес места встречи'
            value={this.state.place}
            onChange={this.placeChanged}
            />}
          {isData && <Input
            id="datetime"
            fullWidth
            floatingLabelText='Время и дата встерчи'
            value={this.state.datetime}
            onChange={this.datetimeChanged}
            />}
          {isData && <Input
            id="problems"
            fullWidth
            multiLine
            floatingLabelText='Проблемы'
            value={this.state.problems}
            onChange={this.problemsChanged}
            />}
          {isData && <Input
            id="needs"
            fullWidth
            floatingLabelText='Нужды'
            multiLine
            value={this.state.needs}
            onChange={this.needsChanged}
            />}
            {isData && <div className="select-department">
              <div className="departs-title">Выберите относящиеся к данному кейсу департаменты и приоритеты</div>
              <div className="ddown"><DropDownMenu
                value={this.state.selectedDepart} 
                onChange={this.handleChangeDepartment}
                style={{minWidth: "200px", 
                        maxWidth: "300px",
                        fontSize: "0.8rem" }}>
                  {this.props.departments.map((dp, ix) => {
                    return <MenuItem key={ix} value={dp.id} primaryText={dp.name} style={{fontSize: '0.7rem'}}/>
                  })}
                </DropDownMenu></div>
              <div className="departments-wrapper">
                {this.state.departs.map((dep, ix)=> {
                  return <Department data={dep} key={ix} priorities={this.props.priorities} onClick={this.handlePriority}/>
                })}
              </div>
            </div>}
          
          {isData && <Toggle
            defaultToggled={this.state.toggle}
            label="Отправить департаментам"
            onToggle={this.handleToggle}
          />}
        </div>
        <div className="btn-wrapper">
          <RaisedButton 
            label={isData ? "Добавить обновления в список" : "Добавить в список"}
            primary={true}
            onClick={isData ? this.updateCases : this.addToCases}
            className="create-btn"
            disabled={!canAdd}
            />
        </div>
      </div>
    )
  }
}
