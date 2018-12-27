import { ADD_CONSUMER, GET_CONSUMERS, GET_CONSUMER, UPDATE_CONSUMER, DELETE_CONSUMER, CONSUMER_LOADING, GET_SEARCH_CONSUMER, GET_CONSUMER_ERROR } from '../constants';

const initialState = {
  consumer : [],
  error : {},
  loading : false
}

export default (state = initialState,action) => {
   switch(action.type){
      case  CONSUMER_LOADING:
       return{
         ...state,
         loading : true
       }
      case GET_CONSUMERS:
        return{
          ...state,
          consumer : action.payload,
          error : {},
          loading: false
        }
      case GET_CONSUMER:
        return{
          ...state,
          consumer : action.payload,
          error : {}
        }
      case ADD_CONSUMER:
       return{
         ...state,
         consumer : action.payload,
         error : {},
         loading : false
       }
      case UPDATE_CONSUMER:
       return{
         ...state,
         consumer : action.payload,
         error : {},
         loading : false
       }
      case DELETE_CONSUMER:
       return{
         ...state,
         consumer : state.consumer.filter(consumer => consumer._id !== action.payload)
       }
      case GET_SEARCH_CONSUMER:
        return{
          ...state,
          consumer : action.payload,
          error : {}
        }
      case GET_CONSUMER_ERROR:
       return{
         ...state,
         error : action.payload,
         consumer : [],
         loading: false
       }
      default:
       return state;
   }
}
