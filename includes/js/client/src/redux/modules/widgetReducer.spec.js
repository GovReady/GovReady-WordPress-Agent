import {
  WIDGET_IMPORTED,
  WIDGET_LOADING,
  WIDGET_LOADED,
  WIDGET_LOAD_FAILED,
  WIDGET_POSTING,
  WIDGET_POST_FAILED,
  actions,
  default as widgetReducer
} from './widgetReducer'

let testWidget = {
  name: 'test',
  status: 'init',
  data: {}
}

let testDataState = {
  'widgets': {
    'test': testWidget
  }
}

const testState = (status, data = {}, error = false) => {
  let returnVal = {
    widgets: {
      'test': {
        name: 'test',
        status: status,
        data: data
      }
    }
  }
  if(error) {
    returnVal['widgets']['test']['error'] = error;
  }
  return returnVal;
} 

describe('(Redux Module) widgetReducer', function () {
  it('Should export constants: WIDGET_IMPORTED, WIDGET_LOADING, WIDGET_LOADED, WIDGET_LOAD_FAILED, WIDGET_POSTING, WIDGET_POST_FAILED.', function () {
    expect(WIDGET_IMPORTED).to.equal('WIDGET_IMPORTED');
    expect(WIDGET_LOADING).to.equal('WIDGET_LOADING');
    expect(WIDGET_LOADED).to.equal('WIDGET_LOADED');
    expect(WIDGET_LOAD_FAILED).to.equal('WIDGET_LOAD_FAILED');
    expect(WIDGET_POSTING).to.equal('WIDGET_POSTING');
    expect(WIDGET_POST_FAILED).to.equal('WIDGET_POST_FAILED');
  })

  describe('(Reducer)', function () {
    it('Should be a function.', function () {
      expect(widgetReducer).to.be.a('function')
    })

    it('Should initialize with a state of {widgets: {}} (Object).', function () {
      expect(widgetReducer(undefined, {})).to.deep.equal({widgets: {}})
    })

    it('Should return the previous state if an action was not matched.', function () {
      let state = widgetReducer(undefined, {});
      expect(state).to.deep.equal({widgets: {}});
      state = widgetReducer(state, {type: '@@@@@@@'});
      expect(state).to.deep.equal({widgets: {}});
      state = widgetReducer(state, actions.widgetImported('test'));
      expect(state).to.deep.equal({widgets: {'test': testWidget}});
      state = widgetReducer(state, {type: '@@@@@@@'});
      expect(state).to.deep.equal({widgets: {'test': testWidget}});
    })
  })

  describe('(Action) widgetImported', function () {
    it('Should create an action to init a widget', () => {
      const expectedAction = { 
        type: WIDGET_IMPORTED, 
        widgetName: 'test', 
        widgetInit: testWidget
      };
     expect(actions.widgetImported('test', testWidget)).to.deep.equal(expectedAction);
    })

    it('Should set widget init, init data.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      expect(state).to.deep.equal({widgets: {'test': testWidget}});
    })
  })

  describe('(Action) widgetLoading', function () {
    it('Should create an action to set a widget to loading', () => {
      const expectedAction = { 
        type: WIDGET_LOADING, 
        widgetName: 'test', 
      };
     expect(actions.widgetLoading('test')).to.deep.equal(expectedAction);
    })

    it('Should set widget to loading.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      state = widgetReducer(state, actions.widgetLoading('test'));
      expect(state).to.deep.equal(testState('loading'));
    })
  })

  describe('(Action) widgetLoaded', function () {
    it('Should create an action to set a widget with data', () => {
      const expectedAction = { 
        type: WIDGET_LOADED, 
        widgetName: 'test', 
        data: testWidget
      };
     expect(actions.widgetLoaded('test', testWidget)).to.deep.equal(expectedAction);
    })

    it('Should set widget to loaded, with data.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      state = widgetReducer(state, actions.widgetLoaded('test', {hi: 'ho'}));
      expect(state).to.deep.equal(testState('loaded', {hi: 'ho'}));
    })
  })

  describe('(Action) widgetLoadFailed', function () {
    it('Should create an action to set a widget to loading failed', () => {
      const error = {
        error: 'failed'
      };
      const expectedAction = { 
        type: WIDGET_LOAD_FAILED, 
        widgetName: 'test', 
        error: error
      };
     expect(actions.widgetLoadFailed('test', error)).to.deep.equal(expectedAction);
    })

    it('Should set widget to load failed, with error.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      state = widgetReducer(state, actions.widgetLoadFailed('test', {error: 'failed'}));
      expect(state).to.deep.equal(testState('load_failed', {}, {error: 'failed'}));
    })
  })

  describe('(Action) widgetPosting', function () {
    it('Should create an action to set a widget to posting', () => {
      const expectedAction = { 
        type: WIDGET_POSTING, 
        widgetName: 'test'
      };
     expect(actions.widgetPosting('test')).to.deep.equal(expectedAction);
    })

    it('Should set widget to posting.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      state = widgetReducer(state, actions.widgetPosting('test'));
      expect(state).to.deep.equal(testState('posting'));
    })
  })

  describe('(Action) widgetPostFailed', function () {
    it('Should create an action to set a widget to post failed', () => {
      const error = {
        error: 'failed'
      };
      const expectedAction = { 
        type: WIDGET_POST_FAILED, 
        widgetName: 'test',
        error: error
      };
     expect(actions.widgetPostFailed('test', error)).to.deep.equal(expectedAction);
    })

    it('Should set widget to load failed, with error.', function () {
      let state = widgetReducer(undefined, {});
      state = widgetReducer(state, actions.widgetImported('test'));
      state = widgetReducer(state, actions.widgetPostFailed('test', {error: 'failed'}));
      expect(state).to.deep.equal(testState('post_failed', {}, {error: 'failed'}));
    })
  })

  describe('(Async Action) widgetLoadData', function () {
    it('Should create action to set widget to loading, call endpoint, set to loaded with data', () => {

      const expectedActions = [
        { type: WIDGET_LOADING, widgetName: 'test' },
        { type: WIDGET_LOADED, 
          widgetName: 'test', 
          data: { data: 'here' } 
        }
      ];

      // Init state
      const localTestState = { 
        'widgets': { 
          test: {
            name: 'test',
            status: 'init',
            data: {}
          }
        }
      };

      const store = mockStore(localTestState);

      return store.dispatch(actions.widgetLoadData(
        'test', 
        '/', 
        (data) => { console.log(data); return data;} 
      )).then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })
})
