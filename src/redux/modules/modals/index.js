import { combineReducers } from 'redux';

import signup from './signup';
import login from './login';
import forgot from './forgot';
import message from './message';

export default combineReducers({
  signup,
  login,
  forgot,
  message,
});
