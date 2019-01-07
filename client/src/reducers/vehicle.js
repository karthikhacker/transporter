import { ADD_VEHICLE, GET_VEHICLE, GET_VEHICLES, GET_VEHICLE_ERROR, VEHICLE_LOADING } from '../constants';

const  initialState = {
   vehicle : [],
   error : {},
   loading : false
}

export default (state = initialState,action) => {
   switch(action.type){
      case VEHICLE_LOADING:
       return{
         ...state,
         loading : true
       }
      case ADD_VEHICLE:
       return{
         ...state,
         vehicle : action.payload,
         loading : false,
         error : {}
       }
      case GET_VEHICLE:
       return{
         ...state,
         vehicle : action.payload,
         loading : false,
         error : {}
       }
      case GET_VEHICLES:
       return{
         ...state,
         vehicle : action.payload,
         loading: false,
         error : {}
       }
      case GET_VEHICLE_ERROR:
       return{
         ...state,
         error : action.payload,
         loading : false,
         vehicle : []
       }
      default:
       return state;
   }
}
