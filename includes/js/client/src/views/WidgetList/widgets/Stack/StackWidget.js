import React, { Component, PropTypes } from 'react';

class StackWidget extends Component {

  systemTable (systemData, assessmentState) {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <tbody>
            <tr>
              <th>Os</th>
              <td>{systemData.os}</td>
            </tr>
            <tr>
              <th>PHP</th>
              <td>{systemData.language}</td>
            </tr>
            <tr>
              <th>Application</th>
              <td>{systemData.application.platform}: {systemData.application.version}</td>
            </tr>
            <tr>
              <th>Webserver</th>
              <td>{systemData.server}</td>
            </tr>
            <tr>
              <th>MySQL</th>
              <td>{systemData.database}</td>
            </tr>
            <tr>
              <th>Permissions</th>
              <td>{assessmentState}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.systemTable(this.props.systemData, this.props.assessmentState)}
      </div>
    );
  }
}

StackWidget.propTypes = {
  header: PropTypes.object,
  systemData: PropTypes.object.isRequired,
  assessmentState: PropTypes.object.isRequired
};

export default StackWidget;
