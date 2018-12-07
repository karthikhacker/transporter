import { GET_USERS, GET_USER, UPDATE_USER, ADD_USER, GET_ERRORS, USER_LOADING, DELETE_USER } from '../constants';

const initialState = {
  user : [],
  error : {},
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type){
     case USER_LOADING:
      return{
        ...state,
        loading : true
      }
     case ADD_USER:
      return{
        ...state,
        user : action.payload,
        error : {},
        loading : false
      }
     case GET_USERS:
      return{
        ...state,
        user : action.payload,
        error : {},
        loading : false
      }
     case GET_USER:
       return{
         ...state,
         user : action.payload
       }
     case UPDATE_USER:
      return{
        ...state,
        user : action.payload,
        error : {},
        loading : false
      }
     case GET_ERRORS:
      return{
        ...state,
        error : action.payload,
        loading : false
      }
     case DELETE_USER:
      return{
        ...state,
        user : state.user.filter(user => user._id !== action.payload)
      }
     default:
      return state;
  }
}
