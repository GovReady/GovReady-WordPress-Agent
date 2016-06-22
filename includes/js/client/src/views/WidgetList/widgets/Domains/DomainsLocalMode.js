import React, { Component, PropTypes as PT } from 'react';

class DomainsWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <p>
            This site is operating in local mode, so no domain information is available.
          </p>
          <p><a href="#" onClick={this.props.exitLocalMode} className="btn btn-primary">Leave local</a></p>
        </div>
      </div>
    );
  }
}

DomainsWidget.propTypes = {
  exitLocalMode: PT.func.isRequired
};


export default DomainsWidget;
