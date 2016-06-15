import React, { Component, PropTypes as PT } from 'react';
import config from 'config';
import Widget from '../Widget';
import EmptyPage from 'components/EmptyPage';
import NewsWidget from './NewsWidget';
import NewsPage from './NewsPage';
import NewsPageIndividual from './NewsPageIndividual';

class News extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'news',
        process: this.processData
      }
    );
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    if(this.props.display === 'pageIndividual') {
      const item = widget.data[this.props.individual];
      // Index not found
      if(!item) {
        return (
          <EmptyPage />
        )
      }
      return (
        <NewsPageIndividual
          header={Widget.titleSection(item.title, false, 'h2', false, true, '/dashboard/Measures')} 
          item={item} />
      )
    }
    else if(this.props.display === 'page') {
      return (
        <NewsPage
          header={Widget.titleSection('Security News', false, 'h2', false, true)} 
          items={widget.data} />
      )
    }
    else {
      return (
        <NewsWidget 
          header={Widget.titleSection('Security News', this.props.widgetName, 'h3')} 
          items={widget.data.slice(0, 5)} />
      )
    }
  }
}

News.propTypes = Widget.propTypes({
  individual: PT.number
});
News.defaultProps = Widget.defaultProps();

export default Widget.connect(News);