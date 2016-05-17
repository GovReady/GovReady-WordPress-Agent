import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import siteReducer from './modules/siteReducer';
import widgetReducer from './modules/widgetReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  siteState: siteReducer,
  widgetState: widgetReducer,
  router,
  form: formReducer
});
