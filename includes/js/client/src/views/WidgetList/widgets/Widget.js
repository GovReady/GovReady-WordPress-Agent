import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory, RouterContext, Link } from 'react-router';
import { push } from 'react-router-redux';
import { actions } from 'redux/modules/widgetReducer';
import objectAssign from 'object-assign';

class Widget {

  static registerWidget(widget, payload = false) {
    // Do we need to register initial state info?
    if(!widget.props.widget || !widget.props.widget.status) {
      widget.props.actions.widgetImported(widget.props.widgetName);
    }
    // Do we need to get payload?
    if(payload && (!widget.props.widget || widget.props.widget.status !== 'loaded')) {
      widget.props.actions.widgetLoadData(widget.props.widgetName, payload.url, payload.process);
    }
  }

  static propTypes (props = {}) {
    return objectAssign(props, {
      widgetType: PT.string,
      display: PT.string.isRequired,
      widget: PT.object.isRequired,
      widgetName: PT.string.isRequired,
      actions: PT.object.isRequired
    });
  }

  static defaultProps(props = {}) {
    props.widget = {};
    return props;
  }


  static mapStateToProps (state, ownProps) {
    return {
      widget: state.widgetState.widgets[ownProps.widgetName]
    };
  }

  static mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }

  static connect (widget) {
    return connect(
      this.mapStateToProps,
      this.mapDispatchToProps
    )(widget);
  }

  static loadingDisplay () {
    return (
      <div className='loading'>
        <i className='fa fa-spinner fa-2x fa-spin'></i><span className='sr-only'>Loading</span>
      </div>
    );
  }

  static loadFailed (widgetName) {
    return (
      <p>
        Sorry, {widgetName} is not avalable right now.
      </p>
    );
  }

  static setHtml(text) {
    return {
      dangerouslySetInnerHTML: {
        __html: text
      }
    }
  }

  static backLink (text= 'Back', classes = 'back', backUrl = false) {
    const backClick = (event) => {
      event.preventDefault();
      //@TODO currently no way to do this????
      // Just override with back url
      if(backUrl) {
        hashHistory.push(backUrl);
      }
      // Attempt a "smart back"
      else {
        const currentHash = window.location.hash;
        hashHistory.goBack();
        setTimeout(() => {
          if(currentHash === window.location.hash) {
            hashHistory.push(backUrl);
          }
        }, 0);
      }
    }
    return (
      <a href="#" className={classes} onClick={backClick}>{text}</a>
    );
  }

  static titleSection (text, pageUrl, header = 'h3', absolute = false, backlink = false, overrideUrl = '/dashboard') {
    const headerInner = () => {
      if(pageUrl && !absolute) {
        return (
          <div>
            <Link className='title-text' to={`/dashboard/${pageUrl}`}>
              {text}
            </Link>
          </div>
        )
      }
      else if(pageUrl) {
        return (
          <div>
            <a className='title-text' href={pageUrl}>
              {text}
            </a>
          </div>
        )
      }
      else if(backlink) {
        return (
          <span>
            <span>{text}</span>
            {this.backLink('Back', 'back btn btn-primary pull-right', overrideUrl)}
          </span>
        )
      }
      else {
        return text;
      }
    } 

    return (
      <div className='title'>
        {React.createElement(header, {}, headerInner())}
      </div>
    );
  }

  static panelFooter (text, pageUrl, absolute = false) {
    return (
      <div className='panel-footer'>
        {pageUrl && !absolute &&
          <Link className='title-text' to={`/dashboard/${pageUrl}`}>
            {text} <i className='fa fa-chevron-right'></i>
          </Link>
        }
        {pageUrl && absolute &&
          <a href={pageUrl} className="title-text">
            {text} <i className='fa fa-chevron-right'></i>
          </a>
        }
        {!pageUrl &&
          {text}
        } 
      </div>
    );
  }
}

export default Widget;
