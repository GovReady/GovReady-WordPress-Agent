import React, { PropTypes, Component } from 'react';
import { reduxForm, initialize, propTypes } from 'redux-form';
import PureInput from 'components/PureInput';
import DeleteConfirm from 'components/DeleteConfirm';
import DatePickerWrap from 'components/DatePickerWrap';
// Form fields
export const fields = [
  '_id',
  'measure_id',
  'name',
  'datetime',
  'body',
  'data',
  'confirmDelete'
];

class SubmissionEditPage extends Component {

  editForm() {
    // Extract props
    const { fields: { 
      _id,
      measure_id,
      name,
      datetime,
      body,
      data,
      confirmDelete 
    }, handleSubmit, submissionSubmit, submissionDelete, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(submissionSubmit)}>
        <div className="row">
          <div className="col-md-9">
            <div className="form-group">
              <label className="control-label">Title</label>
              <PureInput type="text" field={title}/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">Frequency</label>
              <select className="form-control" {...frequency}>
                {freqOptions.map(freqOption => <option value={freqOption.time} key={freqOption.time}>{freqOption.label}</option>)}
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="control-label">Start Date</label>
              <div><DatePickerWrap field={datetime} placeholderText="Choose a start date" /></div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="control-label">Description</label>
              <textarea rows="10" className="form-control" {...description}/>
              <div className="help-block">
                <p>This field will become the "template" for submissions on this submission ex:</p>
                <pre>
                  <div>Successfully located backup: (yes / no)</div>
                  <div>Backup copied off site: (yes / no)</div>
                  <div>Url of S3 bucket:</div>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className="pull-left">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? <i/> : <i/>} Submit
            </button>
            {this.props.backLink}
          </div>
          <div className="pull-left">
            {_id.value && (
              <DeleteConfirm 
                index={_id.value} 
                confirmDelete={Boolean(confirmDelete.value)}
                deleteConfirm={confirmDelete.onChange}
                deleteFunc={() => { 
                  submissionsDelete(this.props.fields);
                }} />
            )}
          </div>
        </div>
      </form>
    )
  }

  render () {
    return (
      <div>
        {this.props.header && this.props.header}
        {this.editForm()}
      </div>
    );
  }
}

SubmissionEditPage.propTypes = {
  ...propTypes,
  header: PropTypes.object,
  submission: PropTypes.object.isRequired,
  submissionSubmit: PropTypes.func.isRequired,
  submissionDelete: PropTypes.func.isRequired,
  backLink: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'submissionEdit',
  fields
},
(state, ownProps) => ({
  initialValues: {
    ...ownProps.submission
  }
})
)(SubmissionEditPage);