import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import consumer from  './consumer';

export default combineReducers({
  user,
  auth,
  consumer
})
