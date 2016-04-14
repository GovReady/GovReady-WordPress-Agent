import objectAssign from 'object-assign';

// ------------------------------------
// Constants
// ------------------------------------

export const WIDGETS_IMPORTED = 'WIDGETS_IMPORTED';
export const WIDGET_LOADING = 'WIDGET_LOADING';
export const WIDGET_LOADED = 'WIDGET_LOADED';


// ------------------------------------
// Actions
// ------------------------------------

// Fired when widgets are ready
export function widgetsImported(widgets: object): Action {
  return { type: WIDGETS_IMPORTED, widgets: widgets };
}

// Fired when individual widget fetching data
export function widgetLoading(widgetName): Action {
  return { type: WIDGET_LOADING, widgetName: widgetName };
}

// Fired when widget has data
export function widgetLoaded(widgetName, data): Action {
  return { type: WIDGET_LOADED, widgetName: widgetName, data: data };
}

// Fired when widget should get data
export function widgetLoadData(widgetName: string, url: string, processData: Function): Function  {
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
          console.log(error);
          return;
        }
    }).then((json: object) => {
      const data = processData(json);
      // Call loaded action
      dispatch(widgetLoaded(widgetName, data));
    }).catch(function (error) {
      console.log('request failed', error);
    });
  };
}

export const actions = {
  widgetsImported,
  widgetLoading,
  widgetLoaded,
  widgetLoadData
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [WIDGETS_IMPORTED]: (newState: object, action: {payload: number}): object => {
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
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  widgets: {
    'PluginWidget': {
      name: 'PluginWidget',
      status: 'init',
      data: {}
    },
    'MeasuresWidget': {
      name: 'MeasuresWidget',
      status: 'init',
      data: {}
    },
    'DomainsWidget': {
      name: 'DomainsWidget',
      status: 'init',
      data: {}
    },
    'StackWidget': {
      name: 'StackWidget',
      status: 'init',
      data: {}
    },
    'LogsWidget': {
      name: 'LogsWidget',
      status: 'init',
      data: {}
    }
  }
};

export default function counterReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  if(handler) {
    let newState = objectAssign({}, state);
    return handler(newState, action);
  }
  return state;
}
