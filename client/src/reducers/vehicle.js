import { ADD_VEHICLE, GET_VEHICLE, GET_VEHICLES, UPDATE_VEHICLE, DELETE_VEHICLE,  GET_VEHICLE_ERROR, VEHICLE_LOADING } from '../constants';

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
      case UPDATE_VEHICLE:
       return{
         ...state,
         vehicle : action.payload,
         error : {},
         loading : false
       }
      case DELETE_VEHICLE:
        return{
          ...state,
          vehicle : state.vehicle.filter(vehicle => vehicle._id !== action.payload)
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
