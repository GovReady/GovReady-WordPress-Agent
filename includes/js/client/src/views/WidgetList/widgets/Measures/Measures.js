import React, { PropTypes as PT, Component } from 'react';
import config from 'config';
import Widget from '../Widget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objectAssign from 'object-assign';
import { Link } from 'react-router';
import { actions } from 'redux/modules/widgetReducer';
import { actions as crudActions } from 'redux/modules/measuresReducer';
import {isoToDate, dateToIso} from 'utils/date';
import MeasuresWidget from './MeasuresWidget';
import MeasuresPage from './MeasuresPage';
import MeasureSingle from './Measure/MeasureSingle';
import MeasureEditPage from './Measure/MeasureEditPage';

class Measures extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      false
    );
    this.props.crudActions.fetchRemote(config.apiUrl + 'measures');
  }

  processData (data) {
    return {
      measures: data
    }
  }

  createNewLink(text, to = 'new', classes) {
    return (
      <Link className={classes} to={'/dashboard/Measures/' + to} >{text}</Link>
    );
  }

  // Returns start plus frequency
  dueDateCompounded(measure, string=false) {
    return string ? this.pdue.toISOString() : due;
  }


  // Returns markup for next due
  nextSubmissionDue(measure) {
    console.log(measure.due);
    const due = window.moment(measure.due);//this.dueDateCompounded(measure);
    const now = window.moment();
    let isPast = false;
    if(due.diff(now) < 0) {
      isPast = true;
    }
    const classes = () => isPast ? 'label label-warning' : 'label label-info';
    return (
      <div className={classes()}>
        Due {due.fromNow()}
      </div>
    )
  }

  // Gets a single measure or empty
  getSingle(_id, measures) {
    if(_id) {
      const measure = measures.find((item) => {
        return item._id === _id;
      });
      if(measure) {
        return measure;
      }
    }
    return {
      '_id': '',
      'title': '',
      'body': '',
      'frequency': '',
      'due': '',
      'confirmDelete': ''
    };
  }

  // Gets list of submissions by due date
  getMeasuresByDueDate(count = 3) {
    return this.props.measures.filter((measure) => measure.due).sort((a, b) => {
      return b.due < a.due
    }).slice(0, count);
  }

  handleSubmit(data) {
    let widget = this.props.widget;
    const assignProps = (toSet, setData) => {
      this.props.submitFields.map((field) => {
        if(setData[field] || setData[field] === false) {
          toSet[field] = setData[field];
        }
      });
      return toSet;
    }

    if(widget && widget.status !== 'posting') {
      console.log(data);
      // Convert to server time format
      if(data.due) {
        data.due = dateToIso(data.due);
        
      }
      // Existing record
      if(data._id) {
        this.props.crudActions.updateRemote(
          config.apiUrl + 'measures/' + data._id, 
          data,
          '/dashboard/Measures/',
          true
        );
      } 
      // New item
      else {
        this.props.crudActions.createRemote(
          config.apiUrl + 'measures', 
          assignProps({}, data),
          '/dashboard/Measures/',
          true
        );
      }
    }
  }

  measureDelete(measure) {
    // Launch all actions
    if(measure._id && measure._id.value) {
      this.props.crudActions.deleteRemote(config.apiUrl + 'measures/' + measure._id.value, measure);
    }
    else {
      //error
    }
  }

  render () {

    let {widget, measures} = this.props;
    
    // Return loading if not set
    if(!widget || !widget.status) {
      return Widget.loadingDisplay();
    }
    // Measure page
    if(this.props.display === 'pageIndividual') {
      const measure = this.getSingle(this.props.individual, measures);
       // Measure loading failed
      if(!measure) {
        return (
          <div>
            <h2>Sorry there was an issue getting the measure.</h2>
            {Widget.backLink('Go back', 'btn btn-default')}
          </div>
        )
      }
      return (
        <MeasureSingle
          header={Widget.titleSection(measure.title, false, 'h2', false, true)} 
          createNewLink={this.createNewLink.bind(this)}
          due={this.nextSubmissionDue(measure)}
          measure={measure} />
      );
    }
    // Measure edit page
    else if(this.props.display === 'pageIndividualEdit') {
      let measure, headerText;

      // Creating new measure
      if(this.props.isNew){
        headerText = 'New manual measure';
        measure = this.getSingle(null);
      }
      // not a new measure, so filter
      else if(this.props.individual) {
        measure = this.getSingle(this.props.individual, measures);
        headerText = measure.title;
      }
      // Measure loading failed
      if(!measure) {
        return (
          <div>
            <h2>Sorry there was an issue editing the measure.</h2>
            {Widget.backLink('Go back', 'btn btn-default')}
          </div>
        )
      }
      return (
        <MeasureEditPage 
          header={Widget.titleSection(headerText, false, 'h2', false, true)} 
          measure={measure}
          measureSubmit={this.handleSubmit.bind(this)}
          measureDelete={this.measureDelete.bind(this)}
          createNewLink={this.createNewLink.bind(this)}
          backLink={Widget.backLink('Cancel', 'btn btn-default')} />
      )
    }
    // Measures list page
    else if(this.props.display === 'page') {
      return (
        <MeasuresPage
          header={Widget.titleSection('Measures', false, 'h2', false, true)} 
          createNewLink={this.createNewLink.bind(this)}
          nextSubmissionDue={this.nextSubmissionDue.bind(this)}
          measures={measures} />
      )
    }
    // Widget
    else {
      
      const subHeader = () => {
        return (
          <h5>Track your manual steps here. <Link to='/dashboard/Measures'>See all.</Link></h5>
        )
      }
      return (
        <MeasuresWidget 
          header={Widget.titleSection('Manual Measures', this.props.widgetName)}
          subHeader={measures && measures.length ? subHeader() : false}
          createNewLink={this.createNewLink.bind(this)}
          nextSubmissionDue={this.nextSubmissionDue.bind(this)}
          measures={this.getMeasuresByDueDate()} />
      )
    }
  }
}

Measures.propTypes = Widget.propTypes({
  individual: PT.number,
  isNew: PT.bool
});
Measures.defaultProps = Widget.defaultProps({
  submitFields: [
    'title',
    'body',
    'frequency',
    'due'
  ]
});

// Hooked up to multiple reducers, so dont use stock Widget methods

function mapStateToProps (state, ownProps) {
  return {
    widget: state.widgetState.widgets[ownProps.widgetName],
    measures: state.measuresState
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    crudActions: bindActionCreators(crudActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measures);
