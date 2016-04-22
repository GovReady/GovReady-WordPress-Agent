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
        <div className='row row-top'>
          <div className='col-sm-6 col-md-3'>
            {renderWidget('Plugins')}
          </div>
          <div className='col-sm-6 col-md-3'>
            {false && renderWidget('Measures')}
          </div>

          <div className='col-sm-6 col-md-3'>
            {false && renderWidget('Domains')}
          </div>

          <div className='col-sm-6 col-md-3'>
            {renderWidget('Accounts', {widgetType: 'default'})}
          </div>
        </div>

        <div className='row row-third'>
          <div className='col-sm-6'>
            {renderWidget('Stack')}
          </div>
        </div>
        <div className='row row-fourth'>
          <div className='col-xs-12'>
            {renderWidget('Contacts')}
          </div>
        </div>
        <div className='row row-fifth'>
          <div className='col-sm-6'>
            {renderWidget('Accounts', {widgetType: 'inactive'})}
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
