import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { actions, widgetReducer } from 'redux/modules/widgetReducer';
import Widget from '../Widget';
import Stack from './Stack';
import { mount } from 'enzyme';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<Stack {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Stack {...props} />)
}

describe('(Widget) Stack', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    let boundActions = {};
    for(let key of Object.keys(actions)) {
      boundActions[key] = (_spies[key] = sinon.spy());
    }
    _props = {
      widgetName: 'Stack',
      ...bindActionCreators(boundActions, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    console.log(Object.keys(actions));
    expect(_component.type).to.equal('div')
  })
})