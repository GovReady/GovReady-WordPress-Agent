import React, { PropTypes, Component } from 'react';

class PluginsWidget extends Component {

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.updates}
            <br/>
            <small>{this.props.pluginText} updates</small>
            {this.props.coreUpdate &&
              <small>including {this.props.cms} Core</small>
            }
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

PluginsWidget.propTypes = {
  cms: PropTypes.string.isRequired,
  pluginText: PropTypes.string.isRequired,
  updates: PropTypes.number.isRequired,
  coreUpdate: PropTypes.bool,
  footer: PropTypes.object.isRequired
};

export default PluginsWidget;
