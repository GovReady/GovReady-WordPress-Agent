import React, { PropTypes as PT, Component } from 'react';
import Submissions from './Submissions/Submissions';

class MeasuresWidget extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          {measures.map((measure, index) => (
            <div key={index} className='measure row list-border list-border-small'>
              <div className="col-sm-8">
                <p className="margin-bottom-none">{this.props.createNewLink(measure.title, measure._id)}</p>
              </div>
              <div className="col-sm-4 text-right">
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
        <span>No measures added. <a href="#" onClick={this.props.createDefault}>Import default measures</a> or {this.props.createNewLink('add some')}!</span>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.props.subHeader}
        <div className="row">
          <div className="col-sm-6">
            <h4>Upcoming / Past-due</h4>
            {this.measuresList(this.props.measures)}
          </div>
          <div className="col-sm-6">
            <h4>Recent Task Reports</h4>
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
  createDefault: PT.func.isRequired,
  createNewLink: PT.func.isRequired,
  measures: PT.array.isRequired,
  nextSubmissionDue: PT.func.isRequired,
};

export default MeasuresWidget;
