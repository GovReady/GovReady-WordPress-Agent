import React, { PropTypes as PT, Component } from 'react';

class MeasuresPage extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          {measures.map((measure, index) => (
            <div key={index} className='measure row'>
              <div className="col-sm-8">
                  <h4>{this.props.createNewLink(measure.title, measure._id)}</h4>
                </div>
              <div className="col-sm-4">
                <h4>{this.props.nextSubmissionDue(measure)}</h4>
              </div>
              <div className="col-xs-12">
                <label>Template:</label>
                <pre>
                  {measure.body}
                </pre>
              </div>
            </div>
          ))}
          <div className="alert alert-info">
            <span>Add {this.props.createNewLink('additional measures')}.</span>
          </div>
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
        {this.measuresList(this.props.measures)}
      </div>
    );
  }
}

MeasuresPage.propTypes = {
  header: PT.object.isRequired,
  createNewLink: PT.func.isRequired,
  measures: PT.array.isRequired
};

export default MeasuresPage;
