import objectAssign from 'object-assign';
import { hashHistory } from 'react-router';
import config from 'config';

// ------------------------------------
// Constants
// ------------------------------------

export const SITE_INIT = 'SITE_INIT';
export const SITE_RESET = 'SITE_RESET';
export const SITE_PRE_CHECKING = 'SITE_PRE_CHECKING';
export const SITE_PRE_CHECK_FAILED = 'SITE_PRE_CHECK_FAILED';
export const SITE_PING_CHECKING = 'SITE_PING_CHECKING';
export const SITE_PING_CHECK_FAILED = 'SITE_PING_CHECK_FAILED';
export const SITE_MODE_CHANGE_START = 'SITE_MODE_CHANGE_START';
export const SITE_MODE_CHANGE_SUCCESS = 'SITE_MODE_CHANGE_SUCCESS';
export const SITE_MODE_CHANGE_FAILED = 'SITE_MODE_CHANGE_FAILED';
export const SITE_CHECKING = 'SITE_CHECKING';
export const SITE_CHECK_FAILED = 'SITE_CHECK_FAILED';
export const SITE_LOCAL_CHECKING = 'SITE_LOCAL_CHECKING';
export const SITE_LOCAL_CHECK_FAILED = 'SITE_LOCAL_CHECK_FAILED';
export const SITE_LOADED = 'SITE_LOADED';

// ------------------------------------
// Actions
// ------------------------------------

// Changes site status
export function siteReset (): Action {
  return { type: SITE_RESET };
}

// Changes site status
export function sitePreChecking (): Action {
  return { type: SITE_PRE_CHECKING };
}

// Changes site status
export function sitePreCheckFailed (error: object): Action {
  return { type: SITE_PRE_CHECK_FAILED, error: error };
}

// Changes site status
export function sitePingChecking (): Action {
  return { type: SITE_PING_CHECKING };
}

// Changes site status
export function sitePingCheckFailed (error: object): Action {
  return { type: SITE_PING_CHECK_FAILED, error: error };
}

// Changes site mode
export function siteModeChangeStart (mode: string): Action {
  return { type: SITE_MODE_CHANGE_START, mode: mode };
}

// Changes site mode
export function siteModeChangeSuccess (mode: string): Action {
  return { type: SITE_MODE_CHANGE_SUCCESS, mode: mode };
}

// Changes site status
export function siteModeChangeFailed (mode: string, error: object): Action {
  return { type: SITE_MODE_CHANGE_FAILED, mode: mode, error: error };
}

// Changes site status
export function siteChecking (): Action {
  return { type: SITE_CHECKING };
}

// Changes site status
export function siteCheckFailed (error: object): Action {
  return { type: SITE_CHECK_FAILED, error: error };
}

// Changes site status
export function siteLocalChecking (): Action {
  return { type: SITE_LOCAL_CHECKING };
}

// Changes site status
export function siteLocalCheckFailed (error: object): Action {
  return { type: SITE_LOCAL_CHECK_FAILED, error: error };
}

// Changes site status
export function siteLoaded (mode: string): Action {
  return { type: SITE_LOADED, mode: mode };
}

// Calls endpoint
export function siteCheckPost (url: string, appendUrl: boolean, data: object, method: string): Function {
  return (dispatch: Function) => {
    // Build post data
    let form_data = new FormData();
    if(Object.keys(data).length) { 
      for(let key of Object.keys(data)) {
        form_data.append(key, data[key]);
      }
    }
    // Add normal path? (trigger has seperate url)
    if(appendUrl) {
      url = config.apiUrlNoSite + url;
    }
    // Append method ?
    if(method) {
      url = url + '&method=' + method;
    }
    // Load data
    return fetch(url, {
      method: 'post',
      credentials: 'same-origin',
      body: form_data
    }).then((response: object) => {
      // Good?
      if (response.status >= 200 && response.status < 300) {
        return response.json();
        // @TODO handle Error
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        error.error = response.statusText;
        return error;
      }
    }).then((json: object) => {
      // Some error
      if(json.error || json.err || json === 'err: unknown') {
        let error = new Error();
        error.error = json;
        return error;
      }
      return json;
    }).catch(function (error) {
      return error;
    });
  };
}

export function sitePreCheck( mode: string = config.mode ): Function {
  return (dispatch: Function) => {
    dispatch(sitePreChecking());
    return dispatch(siteCheckPost('/sites/' + config.siteId, true, {}, 'GET')
    ).then((res) => {
      if(!(res instanceof Error)) {
        // @TODO Cache all these endpoints
        let allSet = true;
        let endpoints = [
          'stack',
          'accounts',
          'plugins'
        ]; 
        // If we're not in local, check domains
        if(mode !== 'local') {
          endpoints.push('domain');
        }
        endpoints.map((endpoint) => {
          if(res[endpoint]) {
            allSet = allSet;
          } else {
            allSet = false;
          }
        })
        if(allSet || forceDispatch) {
          dispatch(siteLoaded(config.mode ? config.mode : 'remote'));
          return;
        }
      }
      // Someting went wrong, so dispatch failed
      // Then try the ping check
      dispatch(sitePreCheckFailed());
      dispatch(sitePingCheck());
    }).catch((error) => {
      // Someting went wrong, so dispatch failed
      // Then try the ping check
      dispatch(sitePreCheckFailed());
      dispatch(sitePingCheck());
    });
  }
}

export function sitePingCheck(calls: Array, isLocal: boolean ): Function {
  return (dispatch: Function) => {
    dispatch(sitePingChecking());
    return dispatch(siteCheckPost('/monitor/' + config.siteId + '/ping', true, {}, 'POST')
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        dispatch(sitePingCheckFailed());
        return;
      }
      // Dispatch post all to get data
      dispatch(siteCheckPostAll());
    }).catch((error) => {
      // Dispatch to local mode
      dispatch(sitePingCheckFailed());
    });
  }
}

export function siteModeChange(mode: string, reset: boolean = '', redirect: string = '') {
  return (dispatch: Function) => {
    dispatch(siteModeChangeStart(mode));
    return dispatch(
      siteCheckPost(config.apiTrigger + '&key=changeMode', false, {
          key: 'changeMode',
          mode: mode,
          siteId: config.siteId
      })
    ).then((res) => {
      // We have an error
      if(res instanceof Error) {
        // Dispatch to local mode
        dispatch(siteModeChangeFailed(mode, res));
        return;
      }
      // Dispatch post all to get data
      dispatch(siteModeChangeSuccess(mode));
      if(reset) {
        dispatch(siteReset());
      }
      if(redirect) {
        hashHistory.push(redirect);
      }
    }).catch((error) => {
      // Dispatch to local mode
      dispatch(siteModeChangeFailed(mode, error));
    });
  }
}


export function siteCheckPostAll(): Function {
  return (dispatch: Function) => {
    let calls = [
      {
        url: config.apiTrigger + '&key=changeMode',
        data: {
          key: 'changeMode',
          mode: 'remote',
          siteId: config.siteId
        }
      },
      {
        url:  '/monitor/' + config.siteId + '/domain',
        data: {}
      },
      {
        url: '/monitor/' + config.siteId + '/plugins',
        data: {}
      },
      {
        url: '/monitor/' + config.siteId + '/accounts',
        data: {}
      },
      {
        url: '/monitor/' + config.siteId + '/stack',
        data: {}
      }
    ];
    dispatch(siteChecking());
    return Promise.all(calls.map((call) => {
      return dispatch(siteCheckPost(call.url, true, call.data));
    })).then((returns) => {
      let error;
      // Check results for errors
      returns.map((returnItem) => {
        if(returnItem.error) {
          error = returnItem.error;
        }
      });
      // we had some errors ?
      if(error) {
        // Dispatch failed
        dispatch(siteCheckFailed(error));
      }
      else {
        dispatch(siteLoaded('remote'));
      }
      
    })
    .catch((error) => {
      // Dispatch Failed
      dispatch(siteCheckFailed(error));
    });
  }
}

export function siteLocalCheckPostAll(): Function {
  return (dispatch: Function) => {
    let calls = [
      {
        url: config.apiTrigger + '&key=changeMode',
        data: {
          key: 'changeMode',
          mode: 'local',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger + 'plugins&key=plugins&siteId=' + config.siteId,
        data: {
          key: 'plugins',
          endpoint: 'plugins',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger+ 'accounts&key=accounts&siteId=' + config.siteId,
        data: {
          key: 'accounts',
          endpoint: 'accounts',
          siteId: config.siteId
        }
      },
      {
        url: config.apiTrigger+ 'stack&key=stack&siteId=' + config.siteId,
        data: {
          key: 'stack',
          endpoint: 'stack',
          siteId: config.siteId
        }
      }
    ];
    dispatch(siteLocalChecking());
    return Promise.all(calls.map((call) => {
      return dispatch(siteCheckPost(call.url, false, call.data));
    })).then((returns) => {
      let error;
      // Check results for errors
      returns.map((returnItem) => {
        if(returnItem.error) {
          error = returnItem.error;
        }
      });
      // we had some errors ?
      if(error) {
        dispatch(siteLocalCheckFailed(error));
      }
      else {
        dispatch(siteLoaded('local'));
      }
      
    })
    .catch((error) => {
      dispatch(siteLocalCheckFailed(error));
    });
  }
}

export const actions = {
  siteReset,
  sitePreChecking,
  sitePreCheckFailed,
  sitePingChecking,
  sitePingCheckFailed,
  siteModeChangeStart,
  siteModeChangeSuccess,
  siteModeChangeFailed,
  siteChecking,
  siteCheckFailed,
  siteLocalChecking,
  siteLocalCheckFailed,
  siteLoaded,
  siteCheckPost,
  sitePreCheck,
  sitePingCheck,
  siteModeChange,
  siteCheckPostAll,
  siteLocalCheckPostAll
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SITE_RESET]: (state: object): object => {
    return objectAssign({}, state, {
      'status': SITE_INIT
    });
  },
  [SITE_PRE_CHECKING]: (state: object): object => {
    return objectAssign({}, state, {
      'status': SITE_PRE_CHECKING
    });
  },
  
  [SITE_PRE_CHECK_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': SITE_PRE_CHECK_FAILED,
      'error': action.error
    });
  },
  
  [SITE_PING_CHECKING]: (state: object): object => {
    return objectAssign({}, state, {
      'status': SITE_PING_CHECKING
    });
  },
  
  [SITE_PING_CHECK_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': SITE_PING_CHECK_FAILED,
      'error': action.error
    });
  },

  [SITE_MODE_CHANGE_START]: (state: object, action: {mode: string}): object => {
    return state;
  },

  [SITE_MODE_CHANGE_SUCCESS]: (state: object, action: {mode: string}): object => {
    return objectAssign({}, state, {
      'mode': action.mode
    });
  },
  
  [SITE_MODE_CHANGE_FAILED]: (state: object, action: {mode: string, error: object}): object => {
    return objectAssign({}, state, {
      'error': action.error
    });
  },

  [SITE_CHECKING]: (state: object): object => {
    return objectAssign({}, state, {
      'status': SITE_CHECKING
    });
  },
  
  [SITE_CHECK_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': SITE_CHECK_FAILED,
      'error': action.error
    });
  },
  
  [SITE_LOCAL_CHECKING]: (state: object): object => {
    return objectAssign({}, state, {
      'status': SITE_LOCAL_CHECKING
    });
  },
  
  [SITE_LOCAL_CHECK_FAILED]: (state: object, action: {error: object}): object => {
    return objectAssign({}, state, {
      'status': SITE_LOCAL_CHECK_FAILED,
      'error': action.error
    });
  },
  
  [SITE_LOADED]: (state: object, action: {mode: string}): object => {
    return objectAssign({}, state, {
      'status': SITE_LOADED,
      'mode': action.mode
    });
  }

};

// ------------------------------------
// Helper
// ------------------------------------

export function isSiteLoaded(globalState) {
  return globalState.siteState && globalState.siteState.status === SITE_LOADED;
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  status: SITE_INIT,
  mode: config.mode
};

export default function siteReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
