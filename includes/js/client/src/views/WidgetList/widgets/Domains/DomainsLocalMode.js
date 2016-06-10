import React, { Component, PropTypes as PT } from 'react';

class DomainsWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <p>
            This site is operating in local mode, so no domain information is available.
          </p>
        </div>
      </div>
    );
  }
}

DomainsWidget.propTypes = {
  nextExpires: PT.string.isRequired
};


export default DomainsWidget;
