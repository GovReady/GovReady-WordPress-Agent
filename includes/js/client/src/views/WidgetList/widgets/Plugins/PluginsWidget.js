import React, { PropTypes as PT, Component } from 'react';

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
  cms: PT.string.isRequired,
  pluginText: PT.string.isRequired,
  updates: PT.number.isRequired,
  coreUpdate: PT.bool,
  footer: PT.object.isRequired
};

export default PluginsWidget;
