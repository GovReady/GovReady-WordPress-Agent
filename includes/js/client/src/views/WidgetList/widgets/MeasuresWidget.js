import React, { Component } from 'react';
import config from '../../../config/';
import Widget from '../Widget';

class MeasuresWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'measures');
  }

  processData (data) {
    return data;
  }

  render () {
    const widget = this.props.widget;
    let lastRun = 'Never';
    let totalMeasures = 0;
    // Compile data
    if (widget.data && widget.status === 'loaded') {
      if(widget.data.measures && widget.data.measures.length) {
        lastRun = widget.data.last_checked;
        totalMeasures = widget.data.measures.length;
      }
    }
    return (
      <div className='widget measures-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div className='panel panel-default'>
            <div className='panel-body'>
              <h4>
                {lastRun}
                <br/>
                <small>Measures last validated</small>
              </h4>
            </div>
            {Widget.panelFooter(totalMeasures + ' total measures')}
          </div>
        }
      </div>
    );
  }
}

MeasuresWidget.propTypes = Widget.propTypes();

export default Widget.connect(MeasuresWidget);
