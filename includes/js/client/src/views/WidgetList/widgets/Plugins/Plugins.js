import React, { Component } from 'react';
import config from 'config';
import Widget from '../Widget';
import { Link } from 'react-router';
import PluginsWidget from './PluginsWidget';
import PluginsPage from './PluginsPage';

class Plugins extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'plugins',
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

    let { widget, widgetName, display } = this.props;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let updates = 0;
    let totalPlugins = 0;
    let coreUpdate = (widget.data.core && widget.data.core.updates) ? widget.data.core.updates : false ;

    // Compile data for display
    if (widget.data && widget.data.plugins && widget.data.plugins.length) {
      widget.data.plugins.map((plugin) => {
        if (plugin.updates) {
          updates++;
        }
      });
      totalPlugins = widget.data.plugins.length;
    }

    let pluginText, cmsUrl;

    // CMS Specific
    switch(config.cms) {  
      case 'wordpress':
        cmsUrl = '/wp-admin/plugins.php';
        break;
      case 'drupal': 
        cmsUrl = '/admin/modules';
        break;
    }

    if(display === 'page') {
      return (
        <PluginsPage 
          cms={config.cmsNice}
          pluginText={config.pluginText}
          cmsUrl={cmsUrl}
          pluginUrl={config.pluginUrl}
          header={Widget.titleSection(config.pluginText + 's', false, 'h2', false, true)} 
          updates={updates} 
          core={widget.data.core} 
          plugins={widget.data.plugins} />
      )
    }
    else {
      return (
        <PluginsWidget 
          cms={config.cmsNice}
          pluginText={config.pluginText}
          updates={updates} 
          coreUpdate={coreUpdate} 
          footer={Widget.panelFooter(totalPlugins + ' total ' + config.pluginText.toLowerCase() + 's', widgetName, false)} />
      )
    }
  }
}

Plugins.propTypes = Widget.propTypes();
Plugins.defaultProps = Widget.defaultProps();

export default Widget.connect(Plugins);