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
            {!this.props.ssl.domain && (
              <div>
                <span className="label label-danger">No SSL active</span>
              </div>
            )}
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

DomainsWidget.propTypes = {
  nextExpires: PT.string.isRequired,
  ssl: PT.object.isRequired,
  footer: PT.object.isRequired
};


export default DomainsWidget;
