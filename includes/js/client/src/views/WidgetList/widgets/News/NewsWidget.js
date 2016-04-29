import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class NewsItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="news-item">
        <h4>
          <Link to={'/section/News/' + this.props.index}>{item.title}</Link>
          <ul className="list-inline">
            <li><small>{window.moment(item.published).format('MMMM Do YYYY')}</small></li>
            <li><small><a href={item.link} target="_blank">{item.feed.name}</a></small></li>
          </ul>
        </h4>
      </div>
    )  
  }
}

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

class NewsWidget extends Component {
  render () {
    return (
      <ul className="list-unstyled">
        {this.props.header}
        {this.props.items.map((item, index) => (
          <li key={index} className="news-item">
            <NewsItem item={item} index={index} />
          </li>
        ))}
      </ul>
    );
  }
}

NewsWidget.propTypes = {
  header: PropTypes.object,
  items: PropTypes.array.isRequired
};

export default NewsWidget;
