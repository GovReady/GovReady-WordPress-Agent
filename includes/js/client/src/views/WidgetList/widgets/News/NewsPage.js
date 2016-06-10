import React, { PropTypes as PT, Component } from 'react';
import { Link } from 'react-router';

class NewsItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <h4>
          <Link to={'/dashboard/News/' + this.props.index}>{item.title}</Link>
        </h4>
        <ul className="list-inline">
          <li>{window.moment(item.published).format('MMMM Do YYYY')}</li>
          <li><a href={item.link} target="_blank">{item.feed.name}</a></li>
        </ul>
      </div>
    )  
  }
}

NewsItem.propTypes = {
  item: PT.object.isRequired,
  index: PT.number.isRequired
}

class NewsPage extends Component {
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

NewsPage.propTypes = {
  header: PT.object,
  items: PT.array.isRequired
};

export default NewsPage;
