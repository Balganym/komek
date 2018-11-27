import { combineReducers } from 'redux'
import * as actionTypes from '../constants/actionTypes'

const token = (state = "", action) => {
	switch(action.type) {
		case actionTypes.ACTION_LOGIN_SUCCESS:
			return action.token
		case actionTypes.ACTION_LOGGED_OUT:
			return ""
		default: 
			return state
	}
}

const user = (state = {}, action) => {
	switch(action.type) {
		case actionTypes.ACTION_LOGIN_SUCCESS:
		case actionTypes.ACTION_UPDATE_PROFILE_SUCCESS:
			return action.user
		case actionTypes.ACTION_LOGGED_OUT:
			return {}
		default:
			return state
	}
}

const isCasesCreated = (state = false, action) => {
	switch(action.type) {
		case actionTypes.ACTION_CREATE_CASES_STARTED:
		case actionTypes.ACTION_CREATE_CASES_FAILED:
			return false
		case actionTypes.ACTION_CREATE_CASES_SUCCESS:
			return true
		default:
			return state
	}
}

const areCasesUpdated = (state = false, action) => {
	switch(action.type) {
		case actionTypes.ACTION_UPDATE_CASES_STARTED:
		case actionTypes.ACTION_UPDATE_CASES_FAILED:
			return false
		case actionTypes.ACTION_UPDATE_CASES_SUCCESS:
			return true
		default:
			return state
	}
}

const haveGotAllCases = (state = [], action) => {
	switch(action.type) {
		case actionTypes.ACTION_GET_ALL_CASES_SUCCESS:
			return action.cases
		case actionTypes.ACTION_GET_ALL_CASES_STARTED:
		case actionTypes.ACTION_GET_ALL_CASES_FAILED:
			return []
		default:
			return state
	}
}

const haveGotAllDepartments = (state = [], action) => {
	switch(action.type) {
		case actionTypes.ACTION_GET_ALL_DEPARTMENTS_SUCCESS:
			return action.departments
		case actionTypes.ACTION_GET_ALL_DEPARTMENTS_STARTED:
		case actionTypes.ACTION_GET_ALL_DEPARTMENTS_FAILED:
			return []
		default:
			return state
	}
}

const haveGotPiorities = (state = [], action) => {
	switch(action.type) {
		case actionTypes.ACTION_GET_PRIORITIES_SUCCESS:
			return action.priorities
		case actionTypes.ACTION_GET_PRIORITIES_STARTED:
		case actionTypes.ACTION_GET_PRIORITIES_FAILED:
			return []
		default:
			return state
	}
}

const userReducer = combineReducers({
	token,
	user,
	isCasesCreated,
	haveGotPiorities,
	haveGotAllCases,
	haveGotAllDepartments,
	areCasesUpdated
})

export default userReducer;
