import * as actionTypes from '../constants/actionTypes';
import * as authApi from '../api/authApi';
import { ERRORS } from '../constants/constants';

export const login = (data) => (dispatch, getState) => {
  if (getState().auth.isLoggingIn) {
    return Promise.resolve();
  }

  dispatch({
    type: actionTypes.ACTION_LOGIN_STARTED
  });

  authApi
    .login(data)  
    .then(
      response => {
        if (response.status !== 200) {
          dispatch({
            type: actionTypes.ACTION_LOGIN_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          });
        } else {
          response
            .text()
            .then(
              value => {
                const responseObject = JSON.parse(value);
                console.log('response ', responseObject);
                if(responseObject.code === 0){
                  dispatch({
                    type: actionTypes.ACTION_LOGIN_SUCCESS,
                    token: responseObject.token,
                    user: responseObject.user
                  });
                }else{
                  dispatch({
                    type: actionTypes.ACTION_LOGIN_FAILED,
                    errorMessage: ERRORS.INCORRECT_PASSWORD
                  });
                }
              }
            );
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_LOGIN_FAILED,
          errorMessage: ERRORS.NO_INTERNET
        })
      }
  );
};

// export const logout = () => (dispatch, getState) => {
//   dispatch({
//     type: actionTypes.ACTION_LOGGED_OUT,
//     user: getState().user,
//   });

//   localStorage.clear()
// }

export const logout = () => (dispatch, getState) => {

  dispatch({
    type: actionTypes.ACTION_LOGOUT_STARTED,
  })

  authApi
    .logout(getState().user.token)
    .then(
      response => {
        console.log('rrr ', response);
        if(response.status !== 200){
          dispatch({
            type: actionTypes.ACTION_LOGOUT_FAILED,
            errorMessage: ERRORS.NUMBER + response.status
          })
        } else{
          response
            .text()
            .then(
              value => {
                var responseObject = JSON.parse(value)
                if(responseObject.code === 0) {
                  dispatch({
                    type: actionTypes.ACTION_LOGGED_OUT
                  })
                  localStorage.clear()
                } else {
                  dispatch({
                    type: actionTypes.ACTION_LOGOUT_FAILED,
                    errorMessage: responseObject.message,
                  })
                }
              }
            )
        }
      },
      error => {
        dispatch({
          type: actionTypes.ACTION_LOGOUT_FAILED,
          errorMessage: ERRORS.NO_INTERNET,
        })
      }
    )
}
