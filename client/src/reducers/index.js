import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import consumer from  './consumer';
import vehicle from './vehicle';

export default combineReducers({
  user,
  auth,
  consumer,
  vehicle
})
