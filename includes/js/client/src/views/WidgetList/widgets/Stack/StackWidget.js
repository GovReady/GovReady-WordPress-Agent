import React, { Component, PropTypes as PT } from 'react';

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
              <th>Database</th>
              <td>{systemData.database}</td>
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
  header: PT.object,
  systemData: PT.object.isRequired,
  assessmentState: PT.object.isRequired
};

export default StackWidget;
