import React, { PropTypes as PT, Component } from 'react';

class PluginsWidget extends Component {

  render () {
    const coreUpdate = () => {
      if(!this.props.coreUpdate) {
        return '';
      }
      if(this.props.coreUpdate === 'security') {
        return (
          <div><span className="label label-danger">{this.props.cms} Core security update!</span></div>
        )
      }
      return (
        <div><span className="label label-warning">{this.props.cms} Core update available</span></div>
      )
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.updates}
            <br/>
            <small>{this.props.pluginText} updates</small>
            {coreUpdate()}
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
