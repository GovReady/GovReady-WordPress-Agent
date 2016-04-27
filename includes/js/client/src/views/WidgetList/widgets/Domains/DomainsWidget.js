import React, { Component, PropTypes } from 'react';

class DomainsWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.nextExpires}
            <br/>
            <small>Next domain renewal</small>
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

DomainsWidget.propTypes = {
  nextExpires: PropTypes.string.isRequired,
  footer: PropTypes.object.isRequired
};


export default DomainsWidget;
