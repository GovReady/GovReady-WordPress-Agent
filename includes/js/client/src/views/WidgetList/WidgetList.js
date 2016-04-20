import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/widgetReducer';

import PluginWidget from './widgets/PluginWidget';
import MeasuresWidget from './widgets/MeasuresWidget';
import DomainsWidget from './widgets/DomainsWidget';
import AccountsWidget from './widgets/AccountsWidget';
import StackWidget from './widgets/StackWidget';
import LogsWidget from './widgets/LogsWidget';
import InactiveAccountsWidget from './widgets/InactiveAccountsWidget';

class WidgetsListPage extends Component {
  render () {
    return (
      <div className='widget-layout'>
        <div className='row row-top'>
          <div className='col-sm-6 col-md-3'>
            <PluginWidget widgetName='PluginWidget'/>
          </div>

          <div className='col-sm-6 col-md-3'>
            <MeasuresWidget widgetName='MeasuresWidget'/>
          </div>

          <div className='col-sm-6 col-md-3'>
            <DomainsWidget widgetName='DomainsWidget'/>
          </div>

          <div className='col-sm-6 col-md-3'>
            <AccountsWidget widgetName='AccountsWidget'/>
          </div>
        </div>
        <div className='row row-second'>
          <div className='col-xs-12'>
            <h2>Logs</h2>
          </div>

          <div className='col-sm-6 col-md-3'>
            <LogsWidget widgetName='LogsWidget' logType='error'/>
          </div>

          <div className='col-sm-6 col-md-3'>
            <LogsWidget widgetName='LogsWidget' logType='access'/>
          </div>

          <div className='col-sm-6 col-md-3'>
            <LogsWidget widgetName='LogsWidget' logType='login'/>
          </div>
        </div>

        <div className='row row-third'>
          <div className='col-sm-6'>
            <StackWidget widgetName='StackWidget'/>
          </div>
        </div>
        <div className='row row-fifth'>
          <div className='col-sm-6'>
            <InactiveAccountsWidget widgetName='InactiveAccountsWidget'/>
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
