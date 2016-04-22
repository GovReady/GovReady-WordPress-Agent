import React, { PropTypes, Component } from 'react';

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
        <div className="alert-region">
          {this.props.updates && (
            <div className="alert alert-danger">
              {this.props.updates} <small>Plugin updates</small>
              {this.props.coreUpdate && (
                <small>including WP Core</small>
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
  header: PropTypes.object.isRequired,
  updates: PropTypes.number.isRequired,
  coreUpdate: PropTypes.bool,
  plugins: PropTypes.array.isRequired
};

export default PluginsPage;