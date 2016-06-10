import React, { PropTypes as PT, Component } from 'react';
import Submissions from './Submissions/Submissions';

class MeasuresWidget extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          {measures.map((measure, index) => (
            <div key={index} className='measure row'>
              <div className="col-sm-8">
                <p>{this.props.createNewLink(measure.title, measure._id)}</p>
              </div>
              <div className="col-sm-4">
                {this.props.nextSubmissionDue(measure)}
              </div>
            </div>
          ))}
        </div>
      )
    }
    // No measures, return empty
    return (
      <div className="alert alert-warning">
        <span>No measures added. Please {this.props.createNewLink('add some')}!</span>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.header}
        <h5>Track your manual steps here</h5>
        <div className="row">
          <div className="col-sm-6">
            <h4>Upcoming / Past Due Measures</h4>
            {this.measuresList(this.props.measures)}
          </div>
          <div className="col-sm-6">
            <h4>Recent Submissions</h4>
            <Submissions display="recent" />
          </div>
        </div>
      </div>
    );
  }
}

MeasuresWidget.propTypes = {
  header: PT.object,
  subHeader: PT.object,
  createNewLink: PT.func.isRequired,
  measures: PT.array.isRequired,
  nextSubmissionDue: PT.func.isRequired,
};

export default MeasuresWidget;
