import React, { PropTypes, Component } from 'react';

class MeasuresPage extends Component {

  measuresList (measures) {
    if(measures && measures.length) {
      return (
        <div>
          {measures.map((measure, index) => (
            <div key={index} className='measure'>
              <h4>{this.props.createNewLink(measure.title, measure._id)}</h4>
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
  header: PropTypes.object.isRequired,
  createNewLink: PropTypes.func.isRequired,
  measures: PropTypes.array.isRequired
};

export default MeasuresPage;
