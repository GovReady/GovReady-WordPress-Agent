import React, { Component } from 'react';
import config from '../../../config/';
import Widget from '../Widget';

class PluginWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'plugins');
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
    let updates = 0;
    let totalPlugins = 0;
    let coreUpdate = false;
    // Compile data
    if (widget.data && widget.data.plugins && widget.data.plugins.length) {
      widget.data.plugins.map((plugin) => {
        if (!plugin.status) {
          updates++;
        }
      });
      totalPlugins = widget.data.plugins.length;
      coreUpdate = widget.data.core.status !== 'Current';
    }
    return (
      <div className='widget plugin-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div className='panel panel-default'>
            <div className='panel-body'>
              <h4>
                {updates}
                <br/>
                <small>Plugin updates</small>
                {coreUpdate &&
                  <small>including WP Core</small>
                }
              </h4>
            </div>
            {Widget.panelFooter(totalPlugins + ' total plugins')}
          </div>
        }
      </div>
    );
  }
}

PluginWidget.propTypes = Widget.propTypes();

export default Widget.connect(PluginWidget);
