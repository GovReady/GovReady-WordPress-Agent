import objectAssign from 'object-assign';
import config from 'config';
import apiHelper from './apiHelper';
import {
  crudActionTypes, 
  crudSyncActions, 
  crudAsyncActions, 
  crudActionHandlers
} from './crudHelper';

// ------------------------------------
// Constants
// ------------------------------------

export const actionTypes = crudActionTypes('MEASURES');

// ------------------------------------
// Actions
// ------------------------------------

const syncActions =  crudSyncActions(actionTypes);
const asyncActions = crudAsyncActions(syncActions);
export const actions = objectAssign(syncActions, asyncActions, {
  importDefault: function (url: string): Function {
    return (dispatch: Function) => {
      dispatch(fetchStart());
      // Post to create default
      return fetch(url + '&method=POST', apiHelper.requestParams('post', {
        'siteId': config.siteId
      })).then((response: object) => {
        return apiHelper.responseCheck(response);
      }).then((json: object) => {
        const error = apiHelper.jsonCheck(json);
        if(error) {
          dispatch(syncActions['fetchError'](error));
        }
        if(json && !json.error) {
          dispatch(fetchRemote(config.apiUrl + 'measures'));
        }
        else {
          dispatch(fetchError(json));
        }
      }).catch(function (error) {
        dispatch(fetchError(error));
      });
    };
  }
});

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = crudActionHandlers(actionTypes);

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = [];

export default function reducer (state: object = initialState, action: Action): object {
  const handler = actionHandlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
