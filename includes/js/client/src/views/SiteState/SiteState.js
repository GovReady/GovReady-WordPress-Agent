import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { WidgetList } from '../WidgetList';
import { bindActionCreators } from 'redux';
import config from 'config';
import { 
  actions, 
  SITE_CHECK_FAILED, 
  SITE_PING_CHECK_FAILED,
  SITE_LOCAL_CHECK_FAILED, 
  SITE_LOADED 
} from '../../redux/modules/siteReducer';

class SiteState extends Component {
  componentWillMount () {
    // Need to check site availability
    if(this.props.siteState === 'init') {
      this.props.actions.sitePreCheck();
    }
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.siteState && nextProps.siteState === SITE_LOADED) {
      hashHistory.push('/dashboard');
    }
  } 

  goLocalClick(event) {
    event.preventDefault();
    this.props.actions.siteLocalCheckPostAll();
  }

  render () {
    switch(this.props.siteState) {
      
      case SITE_CHECK_FAILED:
      case SITE_PING_CHECK_FAILED:
        return (
          <div>
            <h2>Oops</h2>
            <p>Our servers could not ping your site. This could be because you are on a local machine
            or behind a password wall.</p>
            <p>You can still use GovReady, however we will not be able to automatically refresh your
            information and some data (information about your domain name, etc) will not be available</p>
            <p><a href="#" onClick={this.goLocalClick.bind(this)} id="local-mode-continue" className="btn btn-primary">Continue in Localhost mode</a></p>
          </div>
        )
      case SITE_LOCAL_CHECK_FAILED:
        return (
          <div>
            <h2>Sorry, something has gone wrong</h2>
            <p>GovReady has been notified, please try again later or contact us.</p>
          </div>
        )
      default:
        return (
          <div className='loading'>
            <i className='fa fa-spinner fa-2x fa-spin'></i><span className='sr-only'>Loading</span>
            <p>We are collecting data about your site. It should only take a minute.  After we have collected your initial data, 
            GovReady will automatically contact your site periodically to keep the data up-to-date. Learn more 
            (@todo: links to GitHub/README with information about the info we collect, etc).</p>
          </div>
        );
    }
  }
}

SiteState.propTypes = {
  actions: PropTypes.object.isRequired,
  siteState: PropTypes.string.isRequired
};

function mapStateToProps (state) {
  return {
    siteState: state.siteState.status
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteState);
