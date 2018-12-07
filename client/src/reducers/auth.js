import { SET_CURRENT_USER, AUTH_ERROR, USER_LOADING } from '../constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
   user : {},
   isAuthenticated : false,
   loading : false,
   error : {}
}

export default (state = initialState,action) => {
  switch(action.type){
    case USER_LOADING:
     return{
       ...state,
       loading : true
     }
    case SET_CURRENT_USER:
     return{
       ...state,
       user : action.payload,
       isAuthenticated : !isEmpty(action.payload),
       loading : false,
       error : {}
     }
    case AUTH_ERROR:
     return{
       ...state,
       error : action.payload,
       user : {},
       loading : false
     }
    default:
     return state;
  }
}
