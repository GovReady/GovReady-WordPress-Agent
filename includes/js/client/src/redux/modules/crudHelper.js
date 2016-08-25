import objectAssign from 'object-assign';
import { hashHistory } from 'react-router';
import config from 'config';
import cuid from 'cuid';
import apiHelper from './apiHelper';
import {default as uniqueArr} from 'utils/unique';

// ------------------------------------
// Constants
// ------------------------------------

export function crudActionTypes(name) {
  return objectAssign({}, {
    // Fetch
    FETCH_START: name + '_FETCH_START',
    FETCH_SUCCESS: name + '_FETCH_SUCCESS',
    FETCH_ERROR: name + '_FETCH_ERROR',
    // Create
    CREATE_START: name + '_CREATE_START',
    CREATE_SUCCESS: name + '_CREATE_SUCCESS',
    CREATE_ERROR: name + '_CREATE_ERROR',
    // Update
    UPDATE_START: name + '_UPDATE_START',
    UPDATE_SUCCESS: name + '_UPDATE_SUCCESS',
    UPDATE_ERROR: name + '_UPDATE_ERROR',
    // Delete
    DELETE_START: name + '_DELETE_START',
    DELETE_SUCCESS: name + '_DELETE_SUCCESS',
    DELETE_ERROR: name + '_DELETE_ERROR',
  });
}

// ------------------------------------
// Actions
// ------------------------------------

export function crudSyncActions(types) {
  return objectAssign({}, {
    fetchStart: function(): Action {
      return {
        type: types['FETCH_START'],
      }
    },

    fetchSuccess: function(records): Action {
      return {
        type:    types['FETCH_SUCCESS'],
        records: records,
      }
    },

    fetchError: function(error): Action {
      return {
        type:  types['FETCH_ERROR'],
        error: error,
      }
    },

    createStart: function(record, genId): Action {
      return {
        type:    types['CREATE_START'],
        record:  record,
        genId:   genId,
      }
    },

    createSuccess: function(record, genId): Action {
      return {
        type:    types['CREATE_SUCCESS'],
        record:  record,
        genId:   genId,
      }
    },

    createError: function(error, record, genId): Action {
      return {
        type:    types['CREATE_ERROR'],
        error:   error,
        record:  record,
        genId:   genId,
      }
    },

    updateStart: function(record): Action {
      return {
        type:    types['UPDATE_START'],
        record:  record,
      }
    },

    updateSuccess: function(record): Action {
      return {
        type:    types['UPDATE_SUCCESS'],
        record:  record,
      }
    },

    updateError: function(error, record): Action {
      return {
        type:    types['UPDATE_ERROR'],
        error:   error,
        record:  record,
      }
    },

    deleteStart: function(record): Action {
      return {
        type:    types['DELETE_START'],
        record:  record,
      }
    },

    deleteSuccess: function(record): Action {
      return {
        type:    types['DELETE_SUCCESS'],
        record:  record,
      }
    },

    deleteError: function(error, record): Action {
      return {
        type:    types['DELETE_ERROR'],
        error:   error,
        record:  record,
      }
    }
  });
}

export function crudAsyncActions(syncActions, success = {}, error = {}) {
  return objectAssign({}, {
    // Fired when widget should get data
    fetchRemote: function (url: string): Function {
      return (dispatch: Function) => {
        dispatch(syncActions['fetchStart']());
        // Load data
        return fetch(url + '&method=GET', apiHelper.requestParams('post')).then((response: object) => {
          return apiHelper.responseCheck(response);
        }).then((json: object) => {
          const error = apiHelper.jsonCheck(json);
          if(error) {
            dispatch(syncActions['fetchError'](error));
          }
          else {
            dispatch(syncActions['fetchSuccess'](json));
          }
        }).catch(function (error) {
          dispatch(syncActions['fetchError'](error));
        });
      };
    },

    createRemote: function (url: string, record: object, redirect: string = false, appendId: boolean = false): Function {
      return (dispatch: Function) => {
        const genId = cuid();
        dispatch(syncActions['createStart'](record, genId));
        // Load data
        return fetch(url, apiHelper.requestParams('post', record)).then((response: object) => {
          return apiHelper.responseCheck(response);
        }).then((json: object) => {
          const error = apiHelper.jsonCheck(json);
          if(error) {
            dispatch(syncActions['createError'](error, record, genId));
          }
          else {
            dispatch(syncActions['createSuccess'](json, genId));
            if(redirect) {
              // Redirect
              hashHistory.push(appendId ? redirect + json._id : redirect);
            }
          }
        }).catch(function (error) {
          dispatch(syncActions['createError'](error, record, genId));
        });
      }
    },

    updateRemote: function (url: string, record: object, redirect: string = false, appendId: boolean = false): Function {
      return (dispatch: Function) => {
        dispatch(syncActions['updateStart'](record));
        // Load data
        return fetch(url, apiHelper.requestParams('post', record)).then((response: object) => {
          return apiHelper.responseCheck(response);
        }).then((json: object) => {
          const error = apiHelper.jsonCheck(json);
          if(error) {
            dispatch(syncActions['updateError'](json, record));
          }
          else {
            dispatch(syncActions['updateSuccess'](json));
            if(redirect) {
              // Redirect
              hashHistory.push(appendId ? redirect + json._id : redirect);
            }
          }
        }).catch(function (error) {
          dispatch(syncActions['updateError'](error, record));
        });
      };
    },

    deleteRemote: function (url: string, record: object, redirect: string = false): Function { 
      dispatch(syncActions['deleteStart'](record));
      // Load data
      return fetch(url + '&method=DELETE', apiHelper.requestParams('post', record)).then((response: object) => {
        return apiHelper.responseCheck(response);
      }).then((json: object) => {
        const error = apiHelper.jsonCheck(json);
        if(error) {
          dispatch(syncActions['deleteError'](json, record));
        }
        else {
          dispatch(syncActions['deleteSuccess'](json));
          if(redirect) {
            // Redirect
            hashHistory.push(redirect);
          }
        }
      }).catch(function (error) {
        dispatch(syncActions['deleteError'](error, record));
      });
    }
  });
}

// ------------------------------------
// Action Handlers
// ------------------------------------

export function crudActionHandlers(types) {
  return objectAssign({}, {
    [types['FETCH_START']]: (state: object, action: {}): object => {
      return state;
    },
    [types['FETCH_SUCCESS']]: (state: object, action: {records: Array}): object => {
      let records = action.records;
      // Try to combine
      if(state && state.length) {
        return uniqueArr(state.concat(records), '_id');
      }
      // just return
      return action.records;
    },
    [types['FETCH_ERROR']]: (state: object, action: {error: object}): object => {
      // @todo log error ?
      return state;
    },
    [types['CREATE_START']]: (state: object, action: {record: object, genId: string}): object => {
      let { record, genId } = action;
      // optimistic update
      record = objectAssign({}, record, {
        _id: genId,
        unsaved: true,
        busy:    true
      });
      return state.concat([record]);
    },
    [types['CREATE_SUCCESS']]: (state: object, action: {record: object, genId: string}): object => {
      let { record, genId } = action, done = false, updatedState;
      updatedState = state.map(rec => {
        if(rec._id === genId) {
          done = true;
          return record;
        }
        return rec;
      });
      return done ? updatedState : state.concat([record]);
    },
    [types['CREATE_ERROR']]: (state: object, action: {error: object, record: object, genId: string}): object => {
      let { record, genId } = action;
      // @todo log error ?
      return state.map(rec => {
        // mark record as unsaved and busy
        if(rec._id === genId) {
          record = objectAssign({}, record, {
            unsaved: true,
            busy:    false,
            error:   'create'
          });
          return record;
        }
        return rec;
      });
    },
    [types['UPDATE_START']]: (state: object, action: {record: object}): object => {
      let record = action.record;
      return state.map(rec => {
        // mark record as unsaved and busy
        if(rec._id === record._id) {
          record = objectAssign({}, record, {
            unsaved: true,
            busy:    true
          });
          return record;
        }
        return rec;
      });
    },
    [types['UPDATE_SUCCESS']]: (state: object, action: {record: object}): object => {
      let record = action.record;
      return state.map(rec => {
        // mark record as unsaved and busy
        return rec._id === record._id ? record : rec;
      });
    },
    [types['UPDATE_ERROR']]: (state: object, action: {error: object, record: object}): object => {
      let record = action.record;
      // @todo log error ?
      return state.map(rec => {
        // mark record as unsaved and busy
        if(rec._id === record._id) {
          record = objectAssign({}, record, {
            unsaved: true,
            busy:    false,
            error:   'update'
          });
          return record;
        }
        return rec;
      });
    },
    [types['DELETE_START']]: (state: object, action: {record: object}): object => {
      let record = action.record;
      return state.map(rec => {
        // mark record as unsaved and busy
        if(rec._id === record._id) {
          record = objectAssign({}, record, {
            deleted: true,
            busy:    true
          });
          return record;
        }
        return rec;
      });
    },
    [types['DELETE_SUCCESS']]: (state: object, action: {record: object}): object => {
      let record = action.record;
      return state.filter(rec => {
        return rec._id !== record._id;
      });
    },
    [types['DELETE_ERROR']]: (state: object, action: {error: object, record: object}): object => {
      let record = action.record;
      // @todo log error ?
      return state.map(rec => {
        // mark record as unsaved and busy
        if(rec._id === record._id) {
          record = objectAssign({}, record, {
            deleted: false,
            busy:    false,
            error:   'delete'
          });
          return record;
        }
        return rec;
      });
    }
  });
};