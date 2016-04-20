import React, { Component } from 'react';
import config from '../../../config/';
import Widget from '../Widget';

class StackWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'stack');
  }

  processData (data) {
    return data;
  }


  permissionsState (scan) {
    let classname = 'danger';
    let text = 'Not run';
    if (scan && scan.state) {
      text = scan.state;
      if (scan.state === 'Passing') {
        classname = 'success';
      }
    }
    return (
      <span className={'label label-' + classname}>{text}</span>
    );
  }

  systemTable (widget) {
    

    return (
      <div className='table-responsive'>
        <table className='table'>
          <tbody>
            <tr>
              <th>Os</th>
              <td>{widget.data.os}</td>
            </tr>
            <tr>
              <th>PHP</th>
              <td>{widget.data.language}</td>
            </tr>
            <tr>
              <th>Application</th>
              <td>{widget.data.application}</td>
            </tr>
            <tr>
              <th>Webserver</th>
              <td>{widget.data.server}</td>
            </tr>
            <tr>
              <th>MySQL</th>
              <td>{widget.data.database}</td>
            </tr>
            <tr>
              <th>Permissions</th>
              <td>{this.permissionsState(widget.data.scan)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render () {
    const widget = this.props.widget;
    return (
      <div className='widget stack-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div>
            {Widget.titleSection('System')}
            {this.systemTable(widget)}
          </div>
        }
      </div>
    );
  }
}

StackWidget.propTypes = Widget.propTypes();

export default Widget.connect(StackWidget);
