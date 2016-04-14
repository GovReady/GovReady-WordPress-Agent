import React, { Component, PropTypes } from 'react';
import Widget from '../Widget';

class LogsWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, apiUrl + 'measuresData.json');
  }

  processData (data) {
    return data;
  }

  printLogsList (widget, count) {
    if (widget.data[this.props.logType]) {
      const logs = widget.data[this.props.logType].slice(0, count);
      return (
        <div className='logs-list'>
          {logs.map((log) => (
            <div key={log.id}>
              <p>
                {log.message.substring(0, 100) + '...'}
                <br />
                <small>{log.dateTime}</small>
              </p>
              <hr/>
            </div>
          ))}
        </div>
      );
    }
  }

  render () {
    const widget = this.props.widget;
    let title = 'Logs';
    if (this.props.logType === 'error') {
      title = 'Errors';
    } else if (this.props.logType === 'access') {
      title = 'Access';
    } else if (this.props.logType === 'login') {
      title = 'Logins';
    }
    return (
      <div className='widget plugin-measures'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div>
            {Widget.titleSection(title)}
            {this.printLogsList(widget, 5)}
          </div>
        }
      </div>
    );
  }
}

LogsWidget.propTypes = Widget.propTypes({
  logType: PropTypes.string.isRequired
});

export default Widget.connect(LogsWidget);
