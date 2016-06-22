import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from 'config';
import { actions } from 'redux/modules/widgetReducer';
import { actions as siteActions } from 'redux/modules/siteReducer';
import { hashHistory } from 'react-router';
import Widget from '../Widget';
import DomainsWidget from './DomainsWidget';
import DomainsPage from './DomainsPage';
import DomainsLocalMode from './DomainsLocalMode';

class Domains extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'domain',
        process: this.processData
      }
    );
  }

  processData (data) {
    return data;
  }

  nextDomainsRenew (widget) {
    let nextDomain = 'Unknown';
    const moment = window.moment(widget.data.expires);
    if (nextDomain === 'Unknown') {
      nextDomain = moment;
    } else {// When we have multiple
      // Sooner
      if (moment.valueOf() < nextDomain.valueOf()) {
        nextDomain = moment;
      }
    }
    if (nextDomain !== 'Unknown') {
      // return nextDomain.toNow(true);
      return nextDomain.format('MMMM Do YYYY');
    }
    return nextDomain;
  }

  exitLocalMode(e) {
    e.preventDefault();
    this.props.siteActions.siteModeChange('init', true, '/');
  }

  render () {

    let widget = this.props.widget;
    
    // In local mode
    if(this.props.mode === 'local') {
      return (
        <DomainsLocalMode 
         exitLocalMode={this.exitLocalMode.bind(this) }/>
      );
    }

    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let ssl = {};
    if(widget.data.ssl.allowed) {
      ssl.expires = window.moment(widget.data.ssl.expires).format('MMMM Do YYYY, h:mm:ss a');
      ssl.domain = widget.data.ssl.cert.subject['CN'];
      ssl.issuedBy = widget.data.ssl.cert.issuer['CN'];
    }

    if(this.props.display === 'page') {
      let domains = [];
      // @todo handle multiple domains
      domains.push({
        expires: window.moment(widget.data.expires).format('MMMM Do YYYY, h:mm:ss a'),
        domain: widget.data.domain,
        whois: widget.data.whois
      });

      return (
        <DomainsPage 
          header={Widget.titleSection('Domains and SSL', false, 'h2', false, true)} 
          domains={domains} 
          ssl={ssl} />
      )
    }
    else {
      return (
        <DomainsWidget 
          nextExpires={this.nextDomainsRenew(widget)} 
          ssl={ssl}
          footer={Widget.panelFooter('Domains + SSL', this.props.widgetName)} />
      )
    }
  }
}

Domains.propTypes = Widget.propTypes();
Domains.defaultProps = Widget.defaultProps();

const mapStateToProps = (state, ownProps) => {
  return {
    widget: state.widgetState.widgets[ownProps.widgetName],
    mode: state.siteState.mode
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    siteActions: bindActionCreators(siteActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Domains);