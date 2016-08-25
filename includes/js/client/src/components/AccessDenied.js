import React, { PropTypes as PT, Component } from 'react';

class AccessDenied extends Component {
  reload() { 
    document.location.reload(true);
  }

  render() {
    return (
      <div className="empty-page">
        <h2>Looks like this page is out of date.</h2>
        <p>
          Please <a href="#" onClick={this.reload}>reload the page</a>
        </p>
      </div>
    )
  }
}

export default AccessDenied;