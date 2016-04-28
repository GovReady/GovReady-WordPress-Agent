import React, { Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import PluginsWidget from './PluginsWidget';
import PluginsPage from './PluginsPage';

class Plugins extends Component {

  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'plugins', this.processData);
  }

  processData (data) {
    return {
      core: {
        status: 'Current'
      },
      plugins: data,
    };
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let updates = 0;
    let totalPlugins = 0;
    let coreUpdate = false;

    // Compile data for display
    if (widget.data && widget.data.plugins && widget.data.plugins.length) {
      widget.data.plugins.map((plugin) => {
        if (plugin.status) {
          updates++;
        }
      });
      totalPlugins = widget.data.plugins.length;
      coreUpdate = widget.data.core.status !== 'Current';
    }

    if(this.props.display === 'page') {
      return (
        <PluginsPage 
          header={Widget.titleSection(this.props.widgetName, false, 'h2', false, true)} 
          updates={updates} 
          coreUpdate={coreUpdate} 
          plugins={widget.data.plugins} />
      )
    }
    else {
      return (
        <PluginsWidget 
          updates={updates} 
          coreUpdate={coreUpdate} 
          footer={Widget.panelFooter(totalPlugins + ' total plugins', '/wp-admin/plugins.php', true)} />
      )
    }
  }
}

Plugins.propTypes = Widget.propTypes();
Plugins.defaultProps = Widget.defaultProps();

export default Widget.connect(Plugins);