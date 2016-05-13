import React, { PropTypes, Component } from 'react';

class ModulesPage extends Component {

  modulesList(modules) {
    return (
      <ul className="list-group">
        {modules.map((module) => (
          <li key={module.namespace} className={'list-group-item' + (module.status ? ' list-group-item-warning' : '')}>
            <span className="badge">{module.version}</span>{module.label}
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
              {this.props.updates} <small>Module updates</small>
              {this.props.coreUpdate && (
                <small>including WP Core</small>
              )}
            </div>
          )}
        </div>
        {this.modulesList(this.props.modules)}
      </div>
    );
  }
}

ModulesPage.propTypes = {
  header: PropTypes.object.isRequired,
  updates: PropTypes.number.isRequired,
  coreUpdate: PropTypes.bool,
  modules: PropTypes.array.isRequired
};

export default ModulesPage;