import React, { PropTypes as PT, Component } from 'react';

class MeasuresPage extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          <h3>Active tasks</h3>
          {measures.map((measure, index) => (
            <div key={index} className='measure row list-border'>
              <div className="col-sm-8">
                  <h4>{this.props.createNewLink(measure.title, measure._id)}</h4>
                </div>
              <div className="col-sm-4 text-right">
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
        <hr/>
        <p>Manual measures are meant to track organizational tasks that need to happen on a regular basis.  Create a measure that has a frequency and task template then your team will be alerted when these tasks are "due."  By submitting a task report, you can track who / when / how maintenance has been completed.</p>
        {this.props.createNewLink('Add new task', 'new', 'btn btn-success')}
        <hr/>
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
