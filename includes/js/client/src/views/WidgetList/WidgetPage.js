import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/widgetReducer';
import EmptyPage from 'components/EmptyPage';
import widgets from './widgets';

class WidgetPage extends Component {

  render () {
    const showEmpty = () => {
      // Widget not found
      if(!widgets[this.props.routeParams.widget]) {
        return true;
      }
      // Individual page param, but no component
      if(this.props.routeParams.individual && !widgets[this.props.routeParams.widget].pageIndividual) {
        return true;
      }
      // Page param, but no param
      if(!widgets[this.props.routeParams.widget].page) {
        return true
      }
      return false;
    }

    // Simple render function from widgetName
    const renderPage = (params = {}) => {
      params.widgetName = this.props.routeParams.widget;
      // Special page route? or generic ?
      if(this.props.routeParams.individual) {
        params.display = 'pageIndividual';
        params.individual = this.props.routeParams.individual;
      }
      else {
        params.display = 'page';
      }
      return React.createElement(widgets[this.props.routeParams.widget].component, params);
    }

    // Page not found
    if(showEmpty()) {
      return (
        <EmptyPage />
      )
    }
    // Show page
    return (
      <div className="page-view">
        {renderPage()}
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