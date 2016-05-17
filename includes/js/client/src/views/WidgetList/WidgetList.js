import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/widgetReducer';
import widgets from './widgets';

console.log(widgets);

class WidgetsListPage extends Component {
  
  render () {
    // Simple render function from widgetName
    const renderWidget = (name, params = {}) => {
      params.widgetName = name;
      params.display = 'widget';
      return React.createElement(widgets[name].component, params);
    }

    return (
      <div className='widget-layout'>
        <div className='row row-first'>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Plugins')}
          </div>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Domains')}
          </div>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Accounts', {widgetType: 'default'})}
          </div>
        </div>
        <div className='row row-third'>
          <div className='col-sm-6'>
            {renderWidget('Stack')}
          </div>
          <div className='col-sm-6'>
            {renderWidget('Recommended')}
            {renderWidget('CmsVulnerabilities')}
          </div>
        </div>
        <div className='row row-fourth'>
          <div className='col-sm-6'>
            {renderWidget('Accounts', {widgetType: 'inactive'})}
          </div>
          <div className='col-sm-6'>
            {renderWidget('Contacts')}
          </div>
        </div>
      </div>
    );
  }
}

WidgetsListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps (state) {
  return {
    appState: state.widgetState
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetsListPage);
