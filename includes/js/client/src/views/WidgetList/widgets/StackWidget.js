import React, { Component, PropTypes } from 'react';
import Widget from '../Widget';


class StackWidget extends Component {

  componentWillMount() {
    Widget.getPayload(this, apiUrl + 'measuresData.json');
  }

  processData(data) {
    return data;
  }

  systemTable(widget) {
    const permissionsState = () => {
      let classname = 'danger';
      let text = 'Not run';
      if (widget.data.scan && widget.data.scan.state) {
        text = widget.data.scan.state;
        if (widget.data.scan.state == 'Passing') {
          classname = 'success';
        }
      }
      return (
        <span className={"label label-" + classname}>{text}</span>
      );
    };
  
    return (
      <div className='table-responsive'>
        <table className='table'>
          <tbody>
            <tr>
              <th>Os</th>
              <td>widget.data.os</td>
            </tr>
            <tr>
              <th>PHP</th>
              <td>widget.data.language</td>
            </tr>
            <tr>
              <th>widget.data.application</th>
              <td>widget.data.application_version</td>
            </tr>
            <tr>
              <th>Webserver</th>
              <td>widget.data.server</td>
            </tr>
            <tr>
              <th>MySQL</th>
              <td>widget.data.database</td>
            </tr>
            <tr>
              <th>Permissions</th>
              <td>{permissionsState()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    const widget = this.props.widget;
    let title = 'Logs';
    if (this.props.logType == 'error') {
      title = 'Errors';
    } else if (this.props.logType == 'access') {
      title = 'Access';
    } else if (this.props.logType == 'login') {
      title = 'Logins';
    }
    return (
      <div className="widget stack-widget">
        {widget.status !== "loaded" && Widget.loadingDisplay()}
        {widget.status === "loaded" &&  
          <div>
            {Widget.titleSection(title)}
            {this.systemTable(widget)}
          </div>
        }
      </div>
    );
  }
}

StackWidget.propTypes = Widget.propTypes();

export default Widget.connect(StackWidget);