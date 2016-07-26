import React, { Component } from 'react';
import config from 'config';
import Widget from '../Widget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objectAssign from 'object-assign';
import { actions } from 'redux/modules/widgetReducer';

import CmsVulnerabilitiesWidget from './CmsVulnerabilitiesWidget';

class CmsVulnerabilities extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'vulnerabilities',
        process: this.processData
      }
    );
  }

  processData (data) {
    return {
      core: ( data.core && data.core.length ) ? data.core.pop() : {},
      plugins: ( data.plugins && data.plugins.length ) ? data.plugins : []
    }
  }

  getPluginDataWithVuln(data) {

    let {widget, plugins} = this.props;

    return {
      core: ( data.core && data.core.vulnerabilities && data.core.vulnerabilities.length ) 
            ? data.core
            : {},
      plugins: ( data.plugins && data.plugins.length ) 
            ? data.plugins.filter( plugin => plugin.vulnerabilities && plugin.vulnerabilities.length ) 
            : []
    }
  }

  render () {

    let {widget, plugins} = this.props;
    // Return loading if not set
    if((!widget || widget.status !== 'loaded') || (!plugins || plugins.status !== 'loaded')) {
      return Widget.loadingDisplay();
    }

    let fullVuln = this.getPluginDataWithVuln(plugins.data);

    if(this.props.display === 'page') {
      // @TODO?
      return (
        <div>CmsVulnerabilitiesPage</div>
      )
    }
    else {
      return (
        <CmsVulnerabilitiesWidget 
          cms={config.cmsNice}
          header={Widget.titleSection('Known vulnerabilities', false, 'h3')}
          core={fullVuln.core}
          plugins={fullVuln.plugins} />
      )
    }
  }
}

CmsVulnerabilities.propTypes = Widget.propTypes();
CmsVulnerabilities.defaultProps = Widget.defaultProps();

// export default Widget.connect(CmsVulnerabilities);

// Hooked up to multiple reducers, so dont use stock Widget methods

function mapStateToProps (state, ownProps) {
  return {
    widget: state.widgetState.widgets[ownProps.widgetName],
    plugins: state.widgetState.widgets['Plugins']
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
)(CmsVulnerabilities);
