import React, { Component, PropTypes as PT } from 'react';
import config from 'config';
import Widget from '../Widget';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import objectAssign from 'object-assign';
import { Link } from 'react-router';
import { actions } from 'redux/modules/widgetReducer';
import { actions as crudActions } from 'redux/modules/contactsReducer';
import {isoToDate, dateToIso} from 'utils/date';
import ContactsWidget from './ContactsWidget';
import ContactsEditPage from './ContactsEditPage';


class Contacts extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      false
    );
    this.props.crudActions.fetchRemote(config.apiUrl + 'contacts');
  }

  emptyText(includeLink) {
    return (
      <div className="alert alert-warning">
        <span>No contact information completed. Please </span>
        {includeLink && (
          <Link to='/dashboard/Contacts'>add some!</Link>
        )}
        {!includeLink && (
          <span>add some!</span>
        )}
      </div>
    );
  }

  handleSubmit(data) {
    let { widget, submitFields, crudActions } = this.props
    const assignProps = (toSet, setData) => {
      submitFields.map((field) => {
        if(setData[field] || setData[field] === false) {
          toSet[field] = setData[field];
        }
      });
      return toSet;
    }

    if(widget && widget.status !== 'posting') {
      let calls = [];
      data.contacts.map((contact, index) => {
        // Convert to server time format
        contact.lastConfirmed = dateToIso(contact.lastConfirmed);
        // Existing record
        if(contact._id) {
          crudActions.updateRemote(config.apiUrl + 'contacts/' + contact._id, contact);
        } 
        // New item
        else {
          crudActions.createRemote(config.apiUrl + 'contacts', assignProps({}, contact));
        }
      });
    }
    
  }

  contactsDelete(contact) {
    // Launch all actions
    if(contact._id && contact._id.value) {
      this.props.crudActions.deleteRemote(config.apiUrl + 'contacts/' + contact._id.value, contact);
    }
    else {
      //error
    }
  }

  render () {

    let { widget, contacts, display, widgetName } = this.props;

    if(display === 'page') {
      return (
        <ContactsEditPage 
          header={Widget.titleSection('Edit contacts', false, 'h2', false, true)} 
          contactsData={contacts}
          contactsSubmit={this.handleSubmit.bind(this)}
          contactsDelete={this.contactsDelete.bind(this)}
          emptyText={this.emptyText()}
          backLink={Widget.backLink('Cancel', 'btn btn-default')} />
      )
    }
    else {
      const subHeader = () => {
        return (
          <h5>Keep this handy list <Link to='/dashboard/Contacts'>updated</Link> with important contacts to maintain your site</h5>
        )
      }
      return (
        <ContactsWidget 
          header={Widget.titleSection('Points of Contact to Maintain your Site', widgetName)} 
          subHeader={subHeader()}
          contacts={contacts}
          emptyText={this.emptyText(true)} />
      )
    }
  }
}

Contacts.propTypes = Widget.propTypes({
  submitFields: PT.array
});
Contacts.defaultProps = Widget.defaultProps({
  submitFields: [
    'name',
    'email',
    'responsibility',
    'phone',
    'lastConfirmed'
  ]
});

// Hooked up to multiple reducers, so dont use stock Widget methods

function mapStateToProps (state, ownProps) {
  return {
    widget: state.widgetState.widgets[ownProps.widgetName],
    contacts: state.contactsState
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    crudActions: bindActionCreators(crudActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
