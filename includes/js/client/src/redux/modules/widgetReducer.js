import objectAssign from 'object-assign';
import apiHelper from './apiHelper';

// ------------------------------------
// Constants
// ------------------------------------

export const WIDGET_IMPORTED = 'WIDGET_IMPORTED';
export const WIDGET_LOADING = 'WIDGET_LOADING';
export const WIDGET_LOADED = 'WIDGET_LOADED';
export const WIDGET_LOAD_FAILED = 'WIDGET_LOAD_FAILED';
export const WIDGET_POSTING = 'WIDGET_POSTING';
export const WIDGET_POST_FAILED = 'WIDGET_POST_FAILED';

// ------------------------------------
// Actions
// ------------------------------------

// Fired when widgets are ready
export function widgetImported (widgetName: string): Action {
  return { type: WIDGET_IMPORTED, widgetName: widgetName };
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
  return { type: WIDGET_LOAD_FAILED, widgetName: widgetName, error: error };
}

// Fired when individual widget fetching data
export function widgetPosting (widgetName: string): Action {
  return { type: WIDGET_POSTING, widgetName: widgetName };
}

// Fired when individual widget fetching data
export function widgetPostFailed (widgetName: string, error: object): Action {
  return { type: WIDGET_POST_FAILED, widgetName: widgetName, error: error };
}

// Fired when widget should get data
export function widgetLoadData (widgetName: string, url: string, processData: Function): Function {
  return (dispatch: Function) => {
    // Call loading action
    dispatch(widgetLoading(widgetName));
    // Load data
    return fetch(url + '&method=GET', apiHelper.requestParams('post')).then((response: object) => {
      return apiHelper.responseCheck(response);
    }).then((json: object) => {
      const error = apiHelper.jsonCheck(json);
      if(error) {
        dispatch(widgetLoadFailed(widgetName, json));
      }
      else {
        const data = processData(json);
        // Call loaded action
        dispatch(widgetLoaded(widgetName, data));
      }
    }).catch(function (error) {
      dispatch(widgetLoadFailed(widgetName, error));
    });
  };
}

// Fired when widget should get data
export function widgetPostData (widgetName: string, url: string, method: string = 'POST', data: object): Function {
  return (dispatch: Function) => {
    // Call ;posting action
    dispatch(widgetPosting(widgetName));
    // Load data
    return fetch(url + '&method=' + method, apiHelper.requestParams('post', data)).then((response: object) => {
      return apiHelper.responseCheck(response);
    }).then((json: object) => {
      const error = apiHelper.jsonCheck(json);
      if(error) {
        dispatch(widgetPostFailed(widgetName, json));
      }
      else {
        // Call loaded action
        // dispatch(widgetLoaded(widgetName, null));
      }
    }).catch(function (error) {
      dispatch(widgetPostFailed(widgetName, error));
    });
  };
}

export function widgetPostAllData(widgetName: string, calls: Array): Function {
  return (dispatch: Function) => Promise.all(calls.map((call) => {
    return dispatch(widgetPostData(widgetName, call.url, call.method, call.data));
  }));
}

export const actions = {
  widgetImported,
  widgetLoading,
  widgetLoaded,
  widgetLoadData,
  widgetLoadFailed,
  widgetPosting,
  widgetPostData,
  widgetPostAllData,
  widgetPostFailed
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const assignWidgetState = (state, widgetName, widget) => {
  let newWidget = {};
  newWidget[widgetName] = widget;
  return {
    widgets: Object.assign({}, state.widgets, newWidget)
  };
}

const ACTION_HANDLERS = {
  [WIDGET_IMPORTED]: (state: object, action: {widgetName: string, widgetInit: object}): object => {
    const widget = {
      name: action.widgetName,
      status: 'init',
      data: {}
    }
    return assignWidgetState(state, action.widgetName, widget);
  },
  [WIDGET_LOADING]: (state: object, action: {widgetName: string}): object => {
    let widget = objectAssign({}, state.widgets[action.widgetName], {
      'status': 'loading'
    });
    return assignWidgetState(state, action.widgetName, widget);
  },
  [WIDGET_LOADED]: (state: object, action: {widgetName: string, data: object}): object => {
    let widget = objectAssign({}, state.widgets[action.widgetName], {
      'status': 'loaded'
    });
    if(action.data) {
      widget.data = action.data
    }
    return assignWidgetState(state, action.widgetName, widget);
  },
  [WIDGET_LOAD_FAILED]: (state: object, action: {widgetName: string, error: object}): object => {
    let widget = objectAssign({}, state.widgets[action.widgetName], {
      'status': 'load_failed',
      'error': action.error
    });
    return assignWidgetState(state, action.widgetName, widget);
  },
  [WIDGET_POSTING]: (state: object, action: {widgetName: string, data: object}): object => {
    let widget = objectAssign({}, state.widgets[action.widgetName], {
      'status': 'posting'
    });
    return assignWidgetState(state, action.widgetName, widget);
  },
  [WIDGET_POST_FAILED]: (state: object, action: {widgetName: string, error: object}): object => {
    // @TODO handle this
    let widget = objectAssign({}, state.widgets[action.widgetName], {
      'status': 'post_failed',
      'error': action.error
    });
    return assignWidgetState(state, action.widgetName, widget);
  },
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  widgets: {}
};

export default function widgetReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
