import React, { PropTypes as PT, Component } from 'react';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import config from 'config';
import Vulnerability from 'components/Vulnerability';

class PluginsPage extends Component {

  render () {
    let {header, pluginText, cmsUrl, updates, core, cms, plugins} = this.props;
    // core update alert
    const coreUpdate = () => {
      // No update
      if(!core.updates) {
        return '';
      }
      // Has security vulnerabilities
      if(core.vulnerabilities.length) {
        return (
          <Panel className='panel panel-danger' header={cms + ' Core security update!'} eventKey="0">
            {core.vulnerabilities.map((vulnerability, index) => (
              <Vulnerability data={vulnerability} version={core.version} key={index} />
            ))}
          </Panel>
        )
      }
      return (
        <div className="alert alert-warning">{cms} Core update available</div>
      )
    }
    // Returns class for plugin warning vs danger
    const pluginClasses = (plugin) => {
      let classes = 'list-group-item';
      if(!plugin.updates) {
        return classes;
      }
      return (plugin.updates === 'security') ? classes + ' list-group-item-danger' : classes + ' list-group-item-warning';
    }
    // returns plugin updates label
    const pluginUpdate = (plugin) => {
      if(!plugin.updates) {
        return '';
      }
      if(plugin.updates === 'security') {
        return (
          <span className="pull-right"><span className="label label-danger">Security Update Available!</span></span>
        );
      }
      return (
        <span className="pull-right"><span className="label label-warning">Update Available</span></span>
      );
      
    }
    return (
      <div>
        {header}
        <hr/>
        <p>{pluginText + 's'} displayed below represent a heads-up-display of your site health. Those marked in yellow are behind the most current version, and should probably be updated.</p> 
        <p><a className="btn btn-default btn-sml" href={cmsUrl}>Go to CMS page</a></p>
        <hr/>
        <div className="alert-region">
          {coreUpdate()}
          {updates > 0 && (
            <div className="alert alert-danger">
              {updates} <small>{pluginText + 's'} updates</small>
            </div>
          )}
          {!updates && (
            <div className="alert alert-success">{pluginText + 's'} up to date</div>
          )}
        </div>
        <ul className="list-group">
          {plugins.map((plugin) => (
            <li key={plugin.namespace} className={pluginClasses(plugin)}>
              <h4 className="list-group-item-heading">{plugin.label} {pluginUpdate(plugin)}</h4>
              <div className="list-group-item-text">
                <div className="clearfix">
                  <span className="pull-left">Version: <span className="badge">{plugin.version}</span></span>
                  {plugin.project_link && (  
                    <span className="pull-right">
                      <a className="btn btn-default btn-xs" target="_blank" href={plugin.project_link}>{pluginText} page</a>
                    </span>
                  )}
                </div>
                {plugin.vulnerabilities && plugin.vulnerabilities.length && (
                  <div>
                    <br />
                    <div className="well">
                      <h4 className="margin-top-none">Vulnerabilties</h4>
                      {plugin.vulnerabilities.map((vulnerability, index) => (
                        <Vulnerability data={vulnerability} key={index} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
  core: PT.object.isRequired,
  plugins: PT.array.isRequired
};

export default PluginsPage;