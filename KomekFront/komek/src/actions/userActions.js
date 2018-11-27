import * as actionTypes from '../constants/actionTypes'
import * as userApi from '../api/userApi'
import { ERRORS } from '../constants/constants';

export const createCases = (data) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_CREATE_CASES_STARTED,
  })

  userApi
    .createCases(data)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_CREATE_CASES_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value)
                if(responseObject.code === 0){
                  dispatch({
                    type: actionTypes.ACTION_CREATE_CASES_SUCCESS
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_CREATE_CASES_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_CREATE_CASES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const getAllCases = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_GET_ALL_CASES_STARTED,
  })

  userApi
    .getAllCases(getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_ALL_CASES_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_GET_ALL_CASES_SUCCESS,
                  cases: responseObject.cases
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_GET_ALL_CASES_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_ALL_CASES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const updateCases = (data) => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_UPDATE_CASES_STARTED,
  })

  userApi
    .updateCases(data, getState().user.token)
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_UPDATE_CASES_FAILED,
            errorMessage: ERRORS.NUMBER + response.status,
          })
        } else {
          response
          .text()
          .then(
            value => {
              const responseObject = JSON.parse(value)
              console.log('RO ', responseObject);
              if(responseObject.code === 0){
                dispatch({
                  type: actionTypes.ACTION_UPDATE_CASES_SUCCESS,
                })
              } else{
                dispatch({
                  type: actionTypes.ACTION_UPDATE_CASES_FAILED,
                  errorMessage: responseObject.message
                })
              }
            }
          )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_UPDATE_CASES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}


export const getPriorities = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_PRIORITIES_STARTED,
    cases: []
  })

  userApi
    .getPriorities()
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_PRIORITIES_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value)
                if(responseObject.code === 0){
                  dispatch({
                    type: actionTypes.ACTION_GET_PRIORITIES_SUCCESS,
                    priorities: responseObject.priorities
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_GET_PRIORITIES_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_PRIORITIES_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}

export const getAllDepartments = () => (dispatch, getState) => {
  dispatch({
    type: actionTypes.ACTION_GET_ALL_DEPARTMENTS_STARTED,
    cases: []
  })

  userApi
    .getAllDepartments()
    .then(
      response => {
        if(response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_GET_ALL_DEPARTMENTS_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value)
                if(responseObject.code === 0){
                  dispatch({
                    type: actionTypes.ACTION_GET_ALL_DEPARTMENTS_SUCCESS,
                    departments: responseObject.departments
                  })
                } else {
                  dispatch({
                    type: actionTypes.ACTION_GET_ALL_DEPARTMENTS_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_GET_ALL_DEPARTMENTS_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
    )
}
