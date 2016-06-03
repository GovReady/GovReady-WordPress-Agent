import React, { PropTypes, Component } from 'react';

class MeasuresWidget extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          {measures.map((measure, index) => (
            <div key={index} className='measure'>
              <h4>{this.props.createNewLink(measure.title, measure._id)}</h4>
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
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MeasuresWidget.propTypes = {
  header: PropTypes.object,
  subHeader: PropTypes.object,
  createNewLink: PropTypes.func.isRequired,
  measures: PropTypes.array.isRequired
};

export default MeasuresWidget;
