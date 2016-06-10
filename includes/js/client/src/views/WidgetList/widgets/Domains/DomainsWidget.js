import React, { Component, PropTypes as PT } from 'react';

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
  nextExpires: PT.string.isRequired,
  footer: PT.object.isRequired
};


export default DomainsWidget;
