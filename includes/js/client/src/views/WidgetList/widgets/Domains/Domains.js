import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from 'config';
import { actions } from 'redux/modules/widgetReducer';
import Widget from '../../Widget';
import DomainsWidget from './DomainsWidget';
import DomainsPage from './DomainsPage';
import DomainsLocalMode from './DomainsLocalMode';

class Domains extends Component {

  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'domain');
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
      return nextDomain.toNow(true);
    }
    return nextDomain;
  }

  render () {

    let widget = this.props.widget;
    
    // In local mode
    if(this.props.mode === 'local') {
      return (
        <DomainsLocalMode />
      );
    }

    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    if(this.props.display === 'page') {
      let domains = [];
      // @todo handle multiple domains
      domains.push({
        expires: window.moment(widget.data.expires).format('MMMM Do YYYY, h:mm:ss a'),
        domain: widget.data.domain,
        whois: widget.data.whois
      });

      let ssl = {};
      if(widget.data.ssl.allowed) {
        ssl.expires = window.moment(widget.data.ssl.expires).format('MMMM Do YYYY, h:mm:ss a');
        ssl.domain = widget.data.ssl.cert.subject['CN'];
        ssl.issuedBy = widget.data.ssl.cert.issuer['CN'];
      }

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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Domains);