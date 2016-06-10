import React, { PropTypes as PT, Component } from 'react';
import { isoToDate } from 'utils/date';

// Prints measure specific submissions
class SubmissionsList extends Component {

  submissionsList (submissions) {
    if(submissions && submissions.length) {
      return (
        <div>
          {submissions.map((submission, index) => (
            <div key={index} className='submission row'>
              <div className="col-sm-6">
                <label>By</label> {submission.name}
              </div>
              <div className="col-sm-6 text-right">
                {isoToDate(submission.datetime)}
              </div>
              <div className="col-xs-12">
                <label>Notes</label>
                <pre>
                  {submission.body}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )
    }
    // No submissions, return empty
    return (
      <div className="alert alert-warning">
        <span>No submissions added yet.</span>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.submissionsList(this.props.submissions)}
      </div>
    );
  }
}

SubmissionsList.propTypes = {
  submissions: PT.array.isRequired
};

export default SubmissionsList;
