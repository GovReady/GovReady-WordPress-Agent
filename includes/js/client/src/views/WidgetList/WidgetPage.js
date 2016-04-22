import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/widgetReducer';
import EmptyPage from 'components/EmptyPage';
import widgets from './widgets';

class WidgetPage extends Component {

  render () {
    if(!widgets[this.props.routeParams.widget] || !widgets[this.props.routeParams.widget].page) {
      return (
        <EmptyPage />
      )
    }

    // Simple render function from widgetName
    const renderPage = (params = {}) => {
      params.widgetName = this.props.routeParams.widget;
      params.display = 'page';
      return React.createElement(widgets[this.props.routeParams.widget].component, params);
    }

    return (
      <div className="page-view">
        {this.props.routeParams && this.props.routeParams.widget && renderPage()}
      </div>
    )
  }
}

WidgetPage.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps (state, ownProps) {
  return {
    appState: state.widgetState,
    filter: ownProps.location.query.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WidgetPage);