import React, { PropTypes as PT, Component } from 'react';
import { Link } from 'react-router';
 
class EmptyPage extends Component {
  render() {
    return (
      <div className="empty-page">
        <h2>Sorry!</h2>
        <p>
          <span>Looks like there's nothing here.</span>
          <Link className="btn btn-primary" to="/">Head home</Link>
        </p>
      </div>
    )
  }
}

export default EmptyPage;