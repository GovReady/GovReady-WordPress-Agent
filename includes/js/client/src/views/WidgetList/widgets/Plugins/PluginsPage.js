import React, { PropTypes as PT, Component } from 'react';

class PluginsPage extends Component {

  pluginsList(plugins) {
    return (
      <ul className="list-group">
        {plugins.map((plugin) => (
          <li key={plugin.namespace} className={'list-group-item' + (plugin.status ? ' list-group-item-warning' : '')}>
            <span className="badge">{plugin.version}</span>{plugin.label}
          </li>
        ))}
      </ul>
    )
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.props.subHeader}
        <div className="alert-region">
          {this.props.updates && (
            <div className="alert alert-danger">
              {this.props.updates} <small>Plugin updates</small>
              {this.props.coreUpdate && (
                <small>including {this.props.cms} Core</small>
              )}
            </div>
          )}
        </div>
        {this.pluginsList(this.props.plugins)}
      </div>
    );
  }
}

PluginsPage.propTypes = {
  cms: PT.string.isRequired,
  header: PT.object.isRequired,
  subHeader: PT.object.isRequired,
  updates: PT.number.isRequired,
  coreUpdate: PT.bool,
  plugins: PT.array.isRequired
};

export default PluginsPage;