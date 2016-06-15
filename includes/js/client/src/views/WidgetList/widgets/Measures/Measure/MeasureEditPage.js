import React, { PropTypes as PT, Component } from 'react';
import { reduxForm, initialize, propTypes } from 'redux-form';
import PureInput from 'components/PureInput';
import DeleteConfirm from 'components/DeleteConfirm';
import DatePickerWrap from 'components/DatePickerWrap';
// Form fields
export const fields = [
  '_id',
  'title',
  'body',
  'frequency',
  'due',
  'confirmDelete'
];
// Date options
export const freqOptions = [
  {
    label: 'Daily',
    time: (24*60*60)
  },
  {
    label: 'Weekly',
    time: (7*24*60*60)
  },
  {
    label: 'Every two weeks',
    time: (14*24*60*60)
  },
  {
    label: 'Monthly',
    time: (365/12*24*60*60)
  },
  {
    label: 'Quarterly',
    time: (365/4*24*60*60)
  },
  {
    label: 'Yearly',
    time: (365*24*60*60)
  },
];

class MeasuresEditPage extends Component {

  editForm() {
    // Extract props
    const { fields: { 
      _id,
      title,
      body,
      frequency,
      due,
      confirmDelete 
    }, handleSubmit, measureSubmit, measureDelete, submitting, measure } = this.props;
    return (
      <form onSubmit={handleSubmit(measureSubmit)}>
        <fieldset disabled={submitting}>
          <div className="row">
            <div className="col-md-9">
              <div className="form-group">
                <div>
                  <label className="control-label">Title</label>
                  <PureInput type="text" field={title}/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <div>
                  <label className="control-label">Frequency</label>
                  <select className="form-control" {...frequency}>
                    {freqOptions.map(freqOption => <option value={freqOption.time} key={freqOption.time}>{freqOption.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <div>
                  <label className="control-label">Start Date</label>
                  <div><DatePickerWrap field={due} placeholderText="Choose a start date" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <div>
                  <label className="control-label">Task Template</label>
                  <textarea rows="10" className="form-control" {...body}/>
                  <div className="help-block">
                    <p>This field will become the "template" for submissions on this measure ex:</p>
                    <pre>
                      <div>Successfully located backup: (yes / no)</div>
                      <div>Backup copied off site: (yes / no)</div>
                      <div>Url of S3 bucket:</div>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
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
                  measureDelete(this.props.fields);
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
        {this.props.header}
        {this.editForm()}
      </div>
    );
  }
}

MeasuresEditPage.propTypes = {
  ...propTypes,
  header: PT.object.isRequired,
  measure: PT.object.isRequired,
  createNewLink: PT.func.isRequired,
  measureSubmit: PT.func.isRequired,
  measureDelete: PT.func.isRequired,
  backLink: PT.object.isRequired
};

export default reduxForm({
  form: 'measureEdit',
  fields
},
(state, ownProps) => ({
  initialValues: {
    ...ownProps.measure
  }
})
)(MeasuresEditPage);