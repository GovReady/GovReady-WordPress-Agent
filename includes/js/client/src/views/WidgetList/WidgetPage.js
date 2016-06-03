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
      // Individual page param
      if(this.props.routeParams.individual) {
        // null or empty param
        if(!widgets[this.props.routeParams.widget].pageIndividual) {
          return true;
        }
        // Is a "new" path, but this widget doesn't support new
        if(this.props.routeParams.individual === 'new' && !widgets[this.props.routeParams.widget].pageIndividualNew) {
          return true;
        }
        // Is has a view path, but this widget doesn't support new
        if(this.props.routeParams.view && !widgets[this.props.routeParams.widget].pageIndividualView) {
          return true;
        }
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
      // Special page route?
      if(this.props.routeParams.individual) {
        // Create new
        if(this.props.routeParams.individual === 'new') {
          params.isNew = true;
          params.display = 'pageIndividualEdit';
          params.individual = 0;
        }
        // Edit or view?
        else {
          params.isNew = false;
          params.display = this.props.routeParams.view && this.props.routeParams.view === 'edit'
                         ? 'pageIndividualEdit'
                         : 'pageIndividual';
          params.individual = this.props.routeParams.individual;
        }
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