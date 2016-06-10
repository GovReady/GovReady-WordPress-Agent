import React, { Component, PropTypes as PT } from 'react';
import widgets from './widgets';

class WidgetsListPage extends Component {
  
  render () {
    // Simple render function from widgetName
    const renderWidget = (name, params = {}) => {
      params.widgetName = name;
      params.display = 'widget';
      return React.createElement(widgets[name].component, params);
    }

    return (
      <div className='widget-layout'>
        <div className='row row-first'>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Plugins')}
          </div>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Domains')}
          </div>
          <div className='col-sm-4 col-md-4'>
            
          </div>
          <div className='col-sm-4 col-md-4'>
            {renderWidget('Accounts', {widgetType: 'default'})}
          </div>
        </div>
        <div className='row row-seco'>
          <div className='col-sm-6'>
            {renderWidget('Stack')}
          </div>
          <div className='col-sm-6'>
            {renderWidget('Recommended')}
            {renderWidget('CmsVulnerabilities')}
          </div>
        </div>
        <div className='row row-third'>
          <div className='col-sm-12'>
            {renderWidget('Measures')}
          </div>
        </div>
        <div className='row row-fourth'>
          <div className='col-sm-6'>
            {renderWidget('Accounts', {widgetType: 'inactive'})}
          </div>
          <div className='col-sm-6'>
            {renderWidget('Contacts')}
          </div>
        </div>
      </div>
    );
  }
}

export default WidgetsListPage;
