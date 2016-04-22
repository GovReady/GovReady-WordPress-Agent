import React, { PropTypes, Component } from 'react';

class PluginsWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.updates}
            <br/>
            <small>Plugin updates</small>
            {this.props.coreUpdate &&
              <small>including WP Core</small>
            }
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

PluginsWidget.propTypes = {
  updates: PropTypes.number.isRequired,
  coreUpdate: PropTypes.bool,
  footer: PropTypes.object.isRequired
};

export default PluginsWidget;
