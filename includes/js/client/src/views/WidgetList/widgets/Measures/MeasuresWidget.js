import React, { PropTypes, Component } from 'react';

class MeasuresWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.lastRun}
            <br/>
            <small>Measures last validated</small>
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

MeasuresWidget.propTypes = {
  lastRun: PropTypes.number.isRequired,
  totalMeasures: PropTypes.number.isRequired,
  footer: PropTypes.object.isRequired
};

export default MeasuresWidget;
