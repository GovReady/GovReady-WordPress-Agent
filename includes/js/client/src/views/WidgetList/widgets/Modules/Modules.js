import React, { Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import ModulesWidget from './ModulesWidget';
import ModulesPage from './ModulesPage';

class Modules extends Component {

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
      modules: data,
    };
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let updates = 0;
    let totalModules = 0;
    let coreUpdate = false;

    // Compile data for display
    if (widget.data && widget.data.modules && widget.data.modules.length) {
      widget.data.modules.map((module) => {
        if (module.status) {
          updates++;
        }
      });
      totalModules = widget.data.modules.length;
      coreUpdate = widget.data.core.status !== 'Current';
    }

    if(this.props.display === 'page') {
      return (
        <ModulesPage 
          header={Widget.titleSection(this.props.widgetName, false, 'h2', false, true)} 
          updates={updates} 
          coreUpdate={coreUpdate} 
          modules={widget.data.modules} />
      )
    }
    else {
      return (
        <ModulesWidget 
          updates={updates} 
          coreUpdate={coreUpdate} 
          footer={Widget.panelFooter(totalModules + ' total modules', '/admin/modules', true)} />
      )
    }
  }
}

Modules.propTypes = Widget.propTypes();
Modules.defaultProps = Widget.defaultProps();

export default Widget.connect(Modules);