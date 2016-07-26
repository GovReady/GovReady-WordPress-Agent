import React, { Component } from 'react';
import config from 'config';
import Widget from '../Widget';
import RecommendedWidget from './RecommendedWidget';

class Recommended extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'recommended',
        process: this.processData
      }
    );
  }

  processData (data) {
    return {
      plugins: data
    }
  }

  assessmentState (scan) {
    if (scan && scan.state) {
      return scan.state;
    }
    return "Not run";
  } 

  assessmentStateMarkup (scan) {
    let classname = 'danger';
    const text = this.assessmentState(scan)
    if (text === 'Passing') {
      classname = 'success';
    }
    return (
      <span className={'label label-' + classname}>{text}</span>
    );
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    if(this.props.display === 'page') {
      // @TODO?
      return (
        <div>RecommendedPage</div>
      )
    }
    else {
      return (
        <RecommendedWidget 
          pluginText={config.pluginText}
          pluginUrl={config.pluginUrl}
          header={Widget.titleSection('Recommended security ' + config.pluginText.toLowerCase() + 's' , false, 'h3')} 
          plugins={widget.data.plugins} />
      )
    }
  }
}

Recommended.propTypes = Widget.propTypes();
Recommended.defaultProps = Widget.defaultProps();

export default Widget.connect(Recommended);