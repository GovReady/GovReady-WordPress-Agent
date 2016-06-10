import React, { PropTypes as PT, Component } from 'react';
import Submissions from '../Submissions/Submissions';

class MeasureSingle extends Component {
  render () {
    let {header, due, measure} = this.props;
    return (
      <div>
        {header}
        <h4>{due}</h4>
        <div>
          <label>Template:</label>
          <pre>
            {measure.body}
          </pre>
        </div>
        <hr/>
        <h4>Recent Submissions</h4>
        <Submissions display="list" measureId={measure._id} />
        <hr/>
        <h4>Submit new</h4>
        <Submissions display="form" bodyTemplate={measure.body} isNew="true" measureId={measure._id} />
      </div>
    );
  }
}

MeasureSingle.propTypes = {
  header: PT.object.isRequired,
  createNewLink: PT.func.isRequired,
  measure: PT.object.isRequired,
  due: PT.object.isRequired,
  submissions: PT.array.isRequired
};

export default MeasureSingle;
