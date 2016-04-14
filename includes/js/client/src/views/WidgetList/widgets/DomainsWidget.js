import React, { Component } from 'react';
import Widget from '../Widget';

class DomainsWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, apiUrl + 'pluginData.json');
  }

  processData (data) {
    return data;
  }

  nextDomainsRenew (widget) {
    let nextDomain = 'Unknown';
    widget.data.domains.map((domain) => {
      const moment = window.moment(domain.expires);
      if (nextDomain === 'Unknown') {
        nextDomain = moment;
      } else {
        // Sooner
        if (moment.valueOf() < nextDomain.valueOf()) {
          nextDomain = moment;
        }
      }
    });
    if (nextDomain !== 'Unknown') {
      return nextDomain.toNow(true);
    }
    return nextDomain;
  }

  render () {
    let widget = this.props.widget;
    return (
      <div className='widget domains-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div className='panel panel-default'>
            <div className='panel-body'>
              <h4>
                {this.nextDomainsRenew(widget)}
                <br/>
                <small>Next domain renewal</small>
              </h4>
            </div>
            {Widget.panelFooter('Domains + SSL')}
          </div>
        }
      </div>
    );
  }
}

DomainsWidget.propTypes = Widget.propTypes();

export default Widget.connect(DomainsWidget);
