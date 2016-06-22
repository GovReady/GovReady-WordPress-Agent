import React, { PropTypes as PT, Component } from 'react';
import config from 'config';

class PluginsPage extends Component {

  render () {
    let {header, pluginText, cmsUrl, updates, coreUpdate, cms, plugins} = this.props;
    return (
      <div>
        {header}
        <hr/>
        <p>{pluginText + 's'} displayed below represent a heads-up-display of your site health. Those marked in yellow are behind the most current version, and should probably be updated.</p> 
        <p><a className="btn btn-default btn-sml" href={cmsUrl}>Go to CMS page</a></p>
        <hr/>
        <div className="alert-region">
          {updates > 0 && (
            <div className="alert alert-danger">
              {updates} <small>{pluginText + 's'} updates</small>
              {coreUpdate && (
                <small>including {cms} Core</small>
              )}
            </div>
          )}
          {!updates && (
            <div className="alert alert-success">{pluginText + 's'} up to date</div>
          )}
        </div>
        <ul className="list-group">
          {plugins.map((plugin) => (
            <li key={plugin.namespace} className={'list-group-item' + (plugin.update ? ' list-group-item-warning' : '')}>
              <h4 className="list-group-item-heading">{plugin.label}</h4>
              <p className="list-group-item-text clearfix">
                <span className="pull-left">Version: <span className="badge">{plugin.version}</span></span>
                {plugin.project_link && (  
                  <span className="pull-right">
                    <a className="btn btn-default btn-xs" target="_blank" href={plugin.project_link}>{pluginText} page</a>
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

PluginsPage.propTypes = {
  cms: PT.string.isRequired,
  pluginText: PT.string.isRequired,
  header: PT.object.isRequired,
  cmsUrl: PT.string.isRequired,
  pluginUrl: PT.string.isRequired,
  updates: PT.number.isRequired,
  coreUpdate: PT.bool,
  plugins: PT.array.isRequired
};

export default PluginsPage;