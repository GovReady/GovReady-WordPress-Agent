import React, { Component, PropTypes as PT } from 'react';
import widgets from './widgets';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/siteReducer';

class WidgetsListPage extends Component {

  refreshData (e) {
    e.preventDefault();
    this.props.actions.sitePingCheck();
    console.log('refreshing data');
  }
  
  render () {
    // Simple render function from widgetName
    const renderWidget = (name, params = {}) => {
      params.widgetName = name;
      params.display = 'widget';
      return React.createElement(widgets[name].component, params);
    }
    //<div className="refresh-data"><Link to="/" onClick={this.refreshData.bind(this)}><i className="fa fa-refresh"></i> Refresh Data</Link></div>


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
            
          </div>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Accounts', {widgetType: 'default'})}
          </div>
        </div>
        <div className='row row-seco'>
          <div className='col-sm-6'>
            {renderWidget('Stack')}
          </div>
          <div className='col-sm-6'>
            {renderWidget('Recommended')}
            {renderWidget('CmsVulnerabilities')}
          </div>
        </div>
        <div className='row row-third'>
          <div className='col-sm-12'>
            {renderWidget('Measures')}
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

// Hooked up to multiple reducers, so dont use stock Widget methods

function mapStateToProps (state, ownProps) {
  return {
    siteState: state.siteState
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
