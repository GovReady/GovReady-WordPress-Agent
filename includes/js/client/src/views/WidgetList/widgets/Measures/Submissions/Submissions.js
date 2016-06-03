import React, { Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import SubmissionForm from './SubmissionForm';

class Submissions extends Component {

  render () {

    // let widget = this.props.widget;
    
    // Return loading if not set
    // if(!widget || widget.status === 'loading') {
    //   return Widget.loadingDisplay();
    // }
    // else if(widget.status === 'load_failed') {
    //   // return Widget.loadFailed(widget.widgetName, true);
    //   return (
    //     <div className="panel panel-default"><div className="panel-body">
    //       <p>Sorry no measures at the moment</p>
    //     </div></div>
    //   )
    // }

    if(this.props.display === 'form') {
      return (
        <SubmissionEditPage />
      )
    }
    if(this.props.display === 'page') {
      return (
        <SubmissionsPage />
      )
    }
    else {
      return (
        <SubmissionsWidget 
          lastRun={lastRun} 
          totalSubmissions={totalSubmissions} 
          footer={Widget.panelFooter(totalSubmissions + ' total measures', this.props.widgetName)} />
      )
    }
  }
}

Submissions.propTypes = Widget.propTypes();
Submissions.defaultProps = Widget.defaultProps();

export default Submissions;