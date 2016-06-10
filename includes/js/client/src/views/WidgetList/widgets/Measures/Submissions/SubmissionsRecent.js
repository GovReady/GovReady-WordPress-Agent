import React, { PropTypes as PT, Component } from 'react';
import { Link } from 'react-router';
import { isoToDate } from 'utils/date';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';

class SubmissionsRecent extends Component {

  submissionsList (submissions) {
    if(submissions && submissions.length) {
      const header= (submission) => {
        return (
          <div className='row'>
            <div className="col-sm-6">
              <label>By</label> {submission.name}
            </div>
            <div className="col-sm-6 text-right">
              {isoToDate(submission.datetime)}
            </div>
          </div>
        )
      }
      return (
        <Accordion>
          {submissions.map((submission, index) => (
            <Panel header={header(submission)} eventKey={index} key={index}>
              <pre>
                {submission.body}
              </pre>
              <hr />
              <div>
                <Link to={'/dashboard/Measures/' + submission.measureId}>See more <i className="fa fa-chevron-right" /></Link>
              </div>
            </Panel>
          ))}
        </Accordion>
      )
    }
    // No submissions, return empty
    return (
      <div className="alert alert-warning">
        <span>No submissions added.</span>
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

SubmissionsRecent.propTypes = {
  submissions: PT.array.isRequired
};

export default SubmissionsRecent;
