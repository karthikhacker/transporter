import { ADD_VEHICLE, GET_VEHICLE, GET_VEHICLES, UPDATE_VEHICLE, DELETE_VEHICLE, VEHICLE_LOADING, GET_VEHICLE_ERROR, ADD_CONSUMER, GET_CONSUMERS, GET_CONSUMER, UPDATE_CONSUMER, DELETE_CONSUMER, CONSUMER_LOADING, GET_SEARCH_CONSUMER, GET_CONSUMER_ERROR, AUTH_ERROR, GET_USERS, ADD_USER, GET_ERRORS, UPDATE_USER, GET_USER, USER_LOADING, SET_CURRENT_USER, DELETE_USER } from '../constants';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

//Add user
export const addUser = (userData) => {
  return dispatch => {
    dispatch(userLoading());
    axios.post('/api/adduser/',userData).then(res =>
      dispatch({
        type : ADD_USER,
        payload : res.data
      })
    ).
    catch(error =>
     dispatch({
       type : GET_ERRORS,
       payload : error.response.data
     })
    )
  }
}

export const getUsers = () => {
  return disptach => {
    disptach(userLoading());
    axios.get('/api/users').then(res =>
      disptach ({
        type : GET_USERS,
        payload : res.data
      })
    )
    .catch(error =>
      disptach({
        type : GET_ERRORS,
        payload : error.response.data
      })
    )
  }
}
export const searchConsumer = (keyword) => {
  return dispatch => {
    axios.get(`/api/searchconsumer/${keyword}`).then(res =>
      dispatch({
        type :  GET_SEARCH_CONSUMER,
        payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_CONSUMER_ERROR,
        payload : error.response.data
      })
    )
  }
}
export const getUser = (id) => {
  return dispatch => {
    axios.get(`/api/user/${id}`).then(res =>
      dispatch({
        type : GET_USER,
        payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_ERRORS,
        patload : error.response.data
      })
    )
  }
}

//User login
export const userLogin = (userData,history) => {
  return dispatch => {
    dispatch(userLoading());
    axios.post('/api/login/',userData).then(res => {
      history.push('/');
      //save token to ls
      const { token } = res.data;
      localStorage.setItem('jwtToken',token);
      //set auth token
      setAuthToken(token);
      //decode token
      const jwtDecoded = jwtDecode(token);
      //set current user
      dispatch(setCurrentUser(jwtDecoded));
    })
    .catch(error =>
      dispatch({
        type : AUTH_ERROR,
        payload : error.response.data
      })
    )
  }
}

export const setCurrentUser = (token) => {
  return{
    type : SET_CURRENT_USER,
    payload : token
  }
}

export const logoutUser = () => {
  return dispatch => {
    //remove token from ls
    localStorage.removeItem('jwtToken');
    //set auth token to false
    setAuthToken(false);
    dispatch(setCurrentUser({}));

  }
}

export const updateUser = (userData,id) => {
  return dispatch => {
    dispatch(userLoading());
    axios.put(`/api/update/${id}`,userData).then(res =>
      dispatch({
         type : UPDATE_USER,
         payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_ERRORS,
        payload : error.response.data
      })
    )
  }
}

export const deleteUser = (id) => {
  return dispatch => {
    axios.delete(`/api/delete/${id}`).then(res =>
       dispatch({
         type : DELETE_USER,
         payload : id
       })
    )
    .catch(error =>
      dispatch({
        type : GET_ERRORS,
        payload : error.response.data
      })
    )
  }
}

export const userLoading = () => {
  return {
    type  : USER_LOADING
  }
}

// Get consumer
export const getConsumers = () => {
  return dispatch => {
    dispatch(consumerLoading());
    axios.get('/api/consumers').then(res =>
      dispatch({
        type : GET_CONSUMERS,
        payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_CONSUMER_ERROR,
        payload : error.response.data
      })
    )
  }
}
//GET consumer
export const  getConsumer = (id) => {
  return dispatch => {
    axios.get(`/api/consumer/${id}`).then(res =>
       dispatch({
         type : GET_CONSUMER,
         payload : res.data
       })
    ).catch(error =>
       dispatch({
         type : GET_CONSUMER_ERROR,
         payload : error.response.data
       })
    )
  }
}
//Add consumer
export const addConsumer = (consumerData) => {
  return dispatch => {
    dispatch(consumerLoading());
    axios.post('/api/addconsumer',consumerData).then(res =>
      dispatch({
        type : ADD_CONSUMER,
        payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_CONSUMER_ERROR,
        payload : error.response.data
      })
    )
  }
}
//update consumer
export const updateConsumer = (consumerData,id) => {
  return dispatch => {
    dispatch(consumerLoading());
    axios.put(`/api/updateconsumer/${id}`,consumerData).then(res =>
       dispatch({
         type : UPDATE_CONSUMER,
         payload : res.data
       })
    ).catch(error =>
       dispatch({
         type : GET_CONSUMER_ERROR,
         payload : error.response.data
       })
    )
  }
}
//Delete consumer
export const deleteConsumer = (id) => {
  return dispatch => {
    axios.delete(`/api/deleteconsumer/${id}`).then(res =>
      dispatch({
        type : DELETE_CONSUMER,
        payload : id
      })
    ).catch(error =>
       dispatch({
         type : GET_CONSUMER_ERROR,
         payload : error.respobnse.data
       })
    )
  }
}


// consumer loading
export const consumerLoading = () => {
  return{
    type : CONSUMER_LOADING
  }
}

///Add vehicle
export const addVehicle = (VehicleData) => {
  return dispatch => {
    dispatch(getVehicleLoading());
    axios.post('/api/addvehicle',VehicleData).then(res =>
      dispatch({
        type : ADD_VEHICLE,
        payload : res.data
      })
    )
    .catch(error =>
      dispatch({
        type : GET_VEHICLE_ERROR,
        payload : error.response.data
      })
    )
  }
}
//get vehicle
export const getVehicle = (id) => {
  return dispatch => {
    axios.get(`/api/vehicle/${id}`).then(res =>
      dispatch({
        type : GET_VEHICLE,
        payload : res.data
      })
    )
    .catch(error =>
       dispatch({
         type : GET_VEHICLE_ERROR,
         payload : error.response.data
       })
    )
  }
}

// get vehicles
export const getVehicles = () => {
  return dispatch => {
    dispatch(getVehicleLoading());
    axios.get('/api/vehicles').then(res =>
       dispatch({
         type : GET_VEHICLES,
         payload : res.data
       })
    )
    .catch(error =>
       dispatch({
         type : GET_VEHICLE_ERROR,
         payload : error.response.data
       })
    )
  }
}
//Update vehicle
export const updateVehicle = (vehicleData,id) => {
  return dispatch => {
    dispatch(getVehicleLoading());
    axios.put(`/api/editvehicle/${id}`,vehicleData).then(res =>
       dispatch({
         type : UPDATE_VEHICLE,
         payload : res.data
       })
    )
    .catch(error =>
       dispatch({
         type : GET_VEHICLE_ERROR,
         payload : error.response.data
       })
    )
    .catch(error =>
       dispatch({
         type : GET_VEHICLE_ERROR,
         payload : error.response.data
       })
    )
  }
}
//Delete vehicle
export const deleteVehicle = (id) => {
  return dispatch => {
    axios.delete(`/api/deletevehicle/${id}`).then(res =>
       dispatch({
         type : DELETE_VEHICLE,
         payload : id
       })
    )
    .catch(error =>
      dispatch({
        type : GET_VEHICLE_ERROR,
        payload : error.response.data
      })
    )
  }
}
// get vehicle loading
export const getVehicleLoading = () => {
  return{
    type : VEHICLE_LOADING
  }
}
