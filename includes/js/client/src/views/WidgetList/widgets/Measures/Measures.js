import React, { Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import MeasuresWidget from './MeasuresWidget';
import MeasuresPage from './MeasuresPage';

class Measures extends Component {
  
  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'measures', this.processData);
  }

  processData (data) {
    return data;
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let lastRun = 'Never';
    let totalMeasures = 0;
    // Compile data
    if (widget.data && widget.status === 'loaded') {
      if(widget.data.measures && widget.data.measures.length) {
        lastRun = widget.data.last_checked;
        totalMeasures = widget.data.measures.length;
      }
    }

    if(this.props.display === 'page') {
      return (
        <MeasuresPage />
      )
    }
    else {
      return (
        <MeasuresWidget 
          lastRun={lastRun} 
          totalMeasures={totalMeasures} 
          footer={Widget.panelFooter(totalMeasures + ' total measures', this.props.widgetName)} />
      )
    }
  }
}

Measures.propTypes = Widget.propTypes();
Measures.defaultProps = Widget.defaultProps();

export default Widget.connect(Measures);