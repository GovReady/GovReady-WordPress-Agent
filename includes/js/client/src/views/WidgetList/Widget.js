import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../redux/modules/widgetReducer';
import objectAssign from 'object-assign';

class Widget {
  static getPayload (widget, url) {
    // Loading
    widget.props.actions.widgetLoadData(widget.props.widgetName, url, widget.processData);
  }

  static propTypes (props) {
    props = props || {};
    return objectAssign(props, {
      widget: PropTypes.object.isRequired,
      widgetName: PropTypes.string.isRequired,
      actions: PropTypes.object.isRequired
    });
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

  static titleSection (title, header) {
    header = header || 'h3';
    return (
      <div className='title'>
        {React.createElement(header, {}, (
          <span>
            <a className='title-text' href='#'>{title}</a>
            <a className='btn btn-sml pull-right' href='#'>
              <i className='fa fa-chevron-right'></i>
            </a>
          </span>
        ))}
      </div>
    );
  }

  static loadingDisplay () {
    return (
      <div className='loading'>
        <i className='fa fa-spinner'></i><span className='sr-only'>Loading</span>
      </div>
    );
  }

  static panelFooter (text) {
    return (
      <div className='panel-footer'>
        <a className='title-text' href='#'>{text} <i className='fa fa-chevron-right'></i></a>
      </div>
    );
  }
}

export default Widget;
