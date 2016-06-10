import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import siteReducer from './modules/siteReducer';
import widgetReducer from './modules/widgetReducer';
import contactsReducer from './modules/contactsReducer';
import measuresReducer from './modules/measuresReducer';
import submissionsReducer from './modules/submissionsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  siteState: siteReducer,
  widgetState: widgetReducer,
  contactsState: contactsReducer,
  measuresState: measuresReducer,
  submissionsState: submissionsReducer,
  router,
  form: formReducer
});
