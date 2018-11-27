import { SERVER_URL } from '../constants/server';
import { STD_HEADERS } from '../constants/constants';
import qs from 'qs'
import { transformRequest } from '../constants/transform'

const createCasesURL = SERVER_URL + "case/create_cases/";
const getAllCasesURL = SERVER_URL + "case/get_all_cases/";
const getPrioritiesURL = SERVER_URL + "case/get_priorities/";
const getAllDepartmentsURL = SERVER_URL + "department/get_departments";
const updateCasesURL = SERVER_URL + "case/update_cases/";

export const createCases = (data) => {
  console.log(transformRequest(data));
  return fetch(
    createCasesURL,
    {
      method: 'POST',
      headers: STD_HEADERS,
      body: transformRequest(data)
    }
  )
}

export const updateCases = (data, token) => {
  console.log(transformRequest(data), token);
  const ret = fetch(
    updateCasesURL,
    {
      method: 'POST',
      headers: {
        ...STD_HEADERS,
        'Auth-Token': token,
      },
      body: transformRequest(data)
    }
  )
  console.log(ret);
  return ret;
}

export const getAllCases = (token) => (
  fetch(
    getAllCasesURL,
    {
      method: 'GET',
      headers: {
        ...STD_HEADERS,
        'Auth-Token': token,
      }
    }
  )
)

export const getPriorities = () => (
  fetch(
    getPrioritiesURL,
    {
      method: 'GET',
      headers: {
        ...STD_HEADERS
      }
    }
  )
)

export const getAllDepartments = () => (
  fetch(
    getAllDepartmentsURL,
    {
      method: 'GET',
      headers: {
        ...STD_HEADERS
      }
    }
  )
)
