import objectAssign from 'object-assign';

// ------------------------------------
// Constants
// ------------------------------------

export const WIDGET_IMPORTED = 'WIDGET_IMPORTED';
export const WIDGET_LOADING = 'WIDGET_LOADING';
export const WIDGET_LOADED = 'WIDGET_LOADED';
export const WIDGET_LOAD_FAILED = 'WIDGET_LOAD_FAILED';

// ------------------------------------
// Actions
// ------------------------------------

// Fired when widgets are ready
export function widgetImported (widgetName: string, widgetInit: object): Action {
  return { type: WIDGET_IMPORTED, widgetName: widgetName, widgetInit: widgetInit };
}

// Fired when individual widget fetching data
export function widgetLoading (widgetName: string): Action {
  return { type: WIDGET_LOADING, widgetName: widgetName };
}

// Fired when widget has data
export function widgetLoaded (widgetName: string, data: object): Action {
  return { type: WIDGET_LOADED, widgetName: widgetName, data: data };
}

// Fired when widget has data
export function widgetLoadFailed (widgetName: string, error: object): Action {
  return { type: WIDGET_LOAD_FAILED, widgetName: widgetName };
}

// Fired when widget should get data
export function widgetLoadData (widgetName: string, url: string, processData: Function): Function {
  return (dispatch: Function) => {
    // Call loading action
    dispatch(widgetLoading(widgetName));
    // Load data
    return fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
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
      console.log('hello');
      if(json && !json.error) {
        const data = processData(json);
        // Call loaded action
        dispatch(widgetLoaded(widgetName, data));
      }
      else {
        console.log('request failed', json);
        dispatch(widgetLoadFailed(widgetName, json));
      }
    }).catch(function (error) {
      console.log('request failed', error);
      dispatch(widgetLoadFailed(widgetName, error));
    });
  };
}

export const actions = {
  widgetImported,
  widgetLoading,
  widgetLoaded,
  widgetLoadData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WIDGET_IMPORTED]: (newState: object, action: {widgetName: string, widgetInit: object}): object => {
    // If nothing is passed, just do default
    if(!action.widgetInit) {
      action.widgetInit = {
        name: action.widgetName,
        status: 'init',
        data: {}
      }
    }
    newState.widgets[action.widgetName] = action.widgetInit;
    return newState;
  },
  [WIDGET_LOADING]: (newState: object, action: {widgetName: string}): object => {
    newState.widgets[action.widgetName].status = 'loading';
    return newState;
  },
  [WIDGET_LOADED]: (newState: object, action: {widgetName: string, data: object}): object => {
    newState.widgets[action.widgetName] = {
      'widgetName': action.widgetName,
      'status': 'loaded',
      'data': action.data
    };
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  widgets: {}
};

export default function counterReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    let newState = objectAssign({}, state);
    return handler(newState, action);
  }
  return state;
}
