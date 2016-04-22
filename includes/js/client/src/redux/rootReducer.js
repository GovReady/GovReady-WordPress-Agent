import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import widgetReducer from './modules/widgetReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  widgetState: widgetReducer,
  router,
  form: formReducer
});
