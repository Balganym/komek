import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'

const loginUrl = SERVER_URL + "authe/login/";
const logOut = SERVER_URL + "authe/logout/"

export const login = (data) => (
  fetch(
    loginUrl,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: qs.stringify(data)
    }
  )
)

export const logout = (token) => (
  fetch(
    logOut,
    {
      method: 'POST',
      headers: { 
        ...STD_HEADERS,
        'Auth-Token': token,
      }
    }
  )
)
