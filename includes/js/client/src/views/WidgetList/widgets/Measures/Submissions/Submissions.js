import React, { PropTypes as PT, Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objectAssign from 'object-assign';
import { reset as formReset } from 'redux-form';
import { actions as crudActions } from 'redux/modules/submissionsReducer';
import SubmissionsList from './SubmissionsList';
import SubmissionsRecent from './SubmissionsRecent';
import SubmissionEditPage from './SubmissionEditPage';

class Submissions extends Component {

  componentWillMount() {
    if(this.props.measureId) {
      this.fetchSubmissionsByMeasure(this.props.measureId);
    }
    else if(this.props.display === 'recent') {
      this.fetchSubmissionsRecent();
    }
  }

  // Fetches submissions by measureID
  fetchSubmissionsByMeasure(measureId) {
    this.props.crudActions.fetchRemote(config.apiUrl + 'measures/' + measureId + '/submissions');
  }

  // Gets most recent
  fetchSubmissionsRecent() {
    this.props.crudActions.fetchRemote(config.apiUrl + 'submissions');
  }

  // Gets a single submission or empty
  getSingle(_id, submissions = []) {
    let submission;
    if(_id) {
      submission = submissions.find((item) => {
        return item._id === _id;
      });
      if(submission) {
        return submission;
      }
    }
    // Init default
    return {
      '_id': '',
      'measureId': this.props.measureId,
      'name': '',
      'body': this.props.bodyTemplate
    };
  }

  // Gets list of submissions by measureId
  getSubmissionsRecent(count = 3) {
    return this.props.submissions.sort((a, b) => {
      return b.datetime > a.datetime
    }).slice(0, count);
  }

  // Gets list of submissions by measureId
  getSubmissionsByMeasure(measureId, count = 3) {
    return this.props.submissions.filter((submission) => submission.measureId === measureId).sort((a, b) => {
      return b.datetime > a.datetime
    }).slice(0, count);
  }

  handleSubmit(data) {
    const assignProps = (toSet, setData) => {
      this.props.submitFields.map((field) => {
        if(setData[field] || setData[field] === false) {
          toSet[field] = setData[field];
        }
      });
      return toSet;
    }
    let { crudActions, formActions } = this.props;
    // Existing record
    if(data._id) {
      crudActions.updateRemote(
        config.apiUrl + 'measures/' + data.measureId + '/submissions', 
        data,
        '/dashboard/Measures/' + data.measureId,
        false
      ).then(formActions.reset('submissionEdit'));
    } 
    // New item
    else {
      crudActions.createRemote(
        config.apiUrl + 'measures/' + data.measureId + '/submissions', 
        assignProps({}, data),
        '/dashboard/Measures/' + data.measureId,
        false
      ).then(formActions.reset('submissionEdit'));
    }
  }

  render () {

    let { display, measureId, isNew, bodyTemplate, count } = this.props;

    if(display === 'form' || display === 'pageIndividualEdit') {
      let submission, headerText;

      // Creating new submission
      if(isNew && measureId){
        submission = this.getSingle(null);
      }
      // not a new submission, so filter
      else if(measureId) {
        submission = this.getSingle(measureId, submissions);
        headerText = submission.title;
      }
      // Submission loading failed
      if(!submission) {
        return (
          <div>
            <h2>Sorry there was an issue editing the submission.</h2>
            {Widget.backLink('Go back', 'btn btn-default')}
          </div>
        )
      }
      return (
        <SubmissionEditPage
          submission={submission}
          submissionSubmit={this.handleSubmit.bind(this)}
          backLink="" />
      )
    }
    // if(display === 'page') {
    //   return (
    //     <SubmissionsPage />
    //   )
    // }
    if(display === 'list') {
      // Individual measure
      if(measureId) {
        return (
          <SubmissionsList 
            submissions={this.getSubmissionsByMeasure(measureId, count)} />
        )
      }
    }
    return (
      <SubmissionsRecent 
        submissions={this.getSubmissionsRecent(count)} />
    )
  }
}

Submissions.propTypes = {
  individual: PT.number,
  isNew: PT.bool,
  measureId: PT.string,
  bodyTemplate: PT.string
};
Submissions.defaultProps = Widget.defaultProps({
  submitFields: [
    'measureId',
    'name',
    'body'
  ]
});

// Hooked up to multiple reducers, so dont use stock Widget methods

function mapStateToProps (state, ownProps) {
  return {
    submissions: state.submissionsState
  };
}

function mapDispatchToProps (dispatch) {
  return {
    formActions: {
      reset: bindActionCreators(formReset, dispatch)
    },
    crudActions: bindActionCreators(crudActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submissions);
