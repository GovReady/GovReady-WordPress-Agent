import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class NewsPageIndividual extends Component {
  render () {
    const { item } = this.props;
    const bodyText = () => {
      return {__html: item.content};
    }
    return (
      <div>
        {this.props.header}
        <ul className="list-inline">
          <li>{window.moment(item.published).format('MMMM Do YYYY')}</li>
          <li><a href={item.link} target="_blank">{item.feed.name}</a></li>
        </ul>
        <div dangerouslySetInnerHTML={bodyText()} />
      </div>
    );
  }
}

NewsPageIndividual.propTypes = {
  header: PropTypes.object,
  item: PropTypes.object.isRequired
};

export default NewsPageIndividual;
