import React, { PropTypes, Component } from 'react';

class MeasureSingle extends Component {

  recentSubmissions() {
    if(!this.props.submissions || !this.props.submissions.length) {
      return (
        <p>No submissions yet</p>
      )
    } 
    
    return this.props.submissions;
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.props.due}
        <h4>Submit a manual measure</h4>

        <h4>Recent Submissions</h4>
        {this.recentSubmissions()}
      </div>
    );
  }
}

MeasureSingle.propTypes = {
  header: PropTypes.object.isRequired,
  createNewLink: PropTypes.func.isRequired,
  measure: PropTypes.object.isRequired,
  due: PropTypes.object.isRequired,
  submissions: PropTypes.array.isRequired
};

export default MeasureSingle;
