import React, { PropTypes, Component } from 'react';
import config from 'config';
import Widget from '../../Widget';
import MeasuresWidget from './MeasuresWidget';
import MeasuresPage from './MeasuresPage';
import MeasureSingle from './Measure/MeasureSingle';
import MeasureEditPage from './Measure/MeasureEditPage';
import { Link } from 'react-router';

class Measures extends Component {
  
  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'measures', this.processData);
  }

  processData (data) {
    return {
      measures: data
    }
  }

  createNewLink(text, to = 'new') {
    return (
      <Link to={'/dashboard/Measures/' + to} >{text}</Link>
    );
  }

  nextSubmissionDue(measure) {
    const datetime = window.moment(measure.datetime).add(measure.frequency, 'seconds');
    const now = window.moment();
    let isPast = false;
    if(now.diff(datetime, 'days') < 0) {
      isPast = true;
    }
    return (
      <div>
        {isPast && (
          <div className="alert alert-warning">
            <p>This measure is past due!</p>
          </div>
        )}
        <p>
          Due {datetime.toNow()}
        </p>
      </div>
    )
  }

  // Gets a single measure or empty
  getRecentSubmissions(measure) {
    return [];
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
      'datetime': '',
      'confirmDelete': ''
    };
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
      let calls = [];
      // Existing record
      if(data._id) {
        let measureData = objectAssign({}, widget.data.measures[index]);
        calls.push({
          method: 'PATCH',
          url: config.apiUrl + 'measures/' + data._id,
          data: assignProps({}, data)
        });
      } 
      // New item
      else {
        calls.push({
          method: 'POST',
          url: config.apiUrl + 'measures',
          data: assignProps({}, data)
        });
      }
      // Launch post
      this.props.actions.widgetPostAllData(this.props.widgetName, calls).then(
        this.props.actions.widgetLoadData(this.props.widgetName, config.apiUrl + 'measures', this.processData)
      );
    }
  }

  measureDelete(measure) {
    console.log(measure);
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }
    // Measure page
    if(this.props.display === 'pageIndividual') {
      const measure = this.getSingle(this.props.individual, widget.data.measures);
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
          measure={measure}
          submissions={this.getRecentSubmissions(measure)} />
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
        measure = this.getSingle(this.props.individual, widget.data.measures);
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
          measures={widget.data.measures} />
      )
    }
    // Widget
    else {
      // let lastRun = 'Never';
      // let totalMeasures = 0;
      // // Compile data
      // if (widget.data && widget.status === 'loaded') {
      //   if(widget.data.measures && widget.data.measures.length) {
      //     lastRun = widget.data.last_checked;
      //     totalMeasures = widget.data.measures.length;
      //   }
      // }
      return (
        <MeasuresWidget 
          header={Widget.titleSection('Manual Measures', this.props.widgetName)} 
          createNewLink={this.createNewLink.bind(this)}
          measures={widget.data.measures} />
      )
    }
  }
}

Measures.propTypes = Widget.propTypes({
  individual: PropTypes.number,
  isNew: PropTypes.bool
});
Measures.defaultProps = Widget.defaultProps({
  submitFields: [
    'title',
    'process',
    'frequency',
    'datetime'
  ]
});

export default Widget.connect(Measures);