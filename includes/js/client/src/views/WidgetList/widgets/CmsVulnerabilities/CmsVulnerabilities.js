import React, { Component } from 'react';
import config from 'config';
import Widget from '../Widget';
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

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

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
          core={widget.data.core}
          plugins={widget.data.plugins} />
      )
    }
  }
}

CmsVulnerabilities.propTypes = Widget.propTypes();
CmsVulnerabilities.defaultProps = Widget.defaultProps();

export default Widget.connect(CmsVulnerabilities);