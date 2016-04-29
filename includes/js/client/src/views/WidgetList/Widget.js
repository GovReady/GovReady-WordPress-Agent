import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, History, Link } from 'react-router';
import { actions } from 'redux/modules/widgetReducer';
import objectAssign from 'object-assign';

class Widget {

  static registerWidget(widget, props) {
    // Do we need to register initial state info?
    if(!widget.props.widget || !widget.props.widget.status) {
      widget.props.actions.widgetImported(props.widgetName, null);
    }
  }

  static getPayload (widget, url, processData = (data) => { return data; }) {
    // Need to load data from api?
    if(!widget.props.widget || widget.props.widget.status !== 'loaded') {
      widget.props.actions.widgetLoadData(widget.props.widgetName, url, processData);
    }
  }

  static propTypes (props = {}) {
    return objectAssign(props, {
      widgetType: PropTypes.string,
      display: PropTypes.string.isRequired,
      widget: PropTypes.object.isRequired,
      widgetName: PropTypes.string.isRequired,
      actions: PropTypes.object.isRequired
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

  static backLink (text= 'Back', classes = 'back', backUrl = '/') {
    const backClick = (event) => {
      event.preventDefault();
      if (History.length > 1) {
        // this will take you back if there is history
        History.back();
      } else {
        browserHistory.push('/#/');
      }
    }
    return (
      <Link className={classes} to={backUrl}>{text}</Link>
    );
    return (
      <a href="#" className={classes} onClick={backClick}>{text}</a>
    );
  }

  static titleSection (text, pageUrl, header = 'h3', absolute = false, backlink = false) {
    
    const headerInner = () => {
      if(pageUrl && !absolute) {
        return (
          <div>
            <Link className='title-text' to={`/section/${pageUrl}`}>{text}</Link>
            <Link className='btn btn-sml pull-right' to={`/section/${pageUrl}`}>
              <i className='fa fa-chevron-right'></i>
            </Link>
          </div>
        )
      }
      else if(pageUrl) {
        return (
          <div>
            <a className='title-text' href={pageUrl}>{text}</a>
            <a className='btn btn-sml pull-right' href={pageUrl}>
              <i className='fa fa-chevron-right'></i>
            </a>
          </div>
        )
      }
      else if(backlink) {
        return (
          <span>
            <span>{text}</span>
            {this.backLink('Back', 'back btn btn-primary pull-right')}
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
          <Link className='title-text' to={`/section/${pageUrl}`}>
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
