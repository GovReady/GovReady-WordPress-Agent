import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import widgetReducer from './modules/widgetReducer'

export default combineReducers({
  widgetState: widgetReducer,
  router
})
