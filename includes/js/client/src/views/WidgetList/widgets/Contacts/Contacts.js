import React, { Component, PropTypes } from 'react';
import config from 'config';
import Widget from '../../Widget';
import ContactsWidget from './ContactsWidget';
import ContactsEditPage from './ContactsEditPage';
import objectAssign from 'object-assign';

class Contacts extends Component {
  
  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'contacts', this.processData);
  }

  processData (data) {
    return {
      contacts: data
    };
  }

  emptyText() {
    return (
      <div className="alert alert-warning">
        No contact information completed. Please add some!
      </div>
    );
  }

  handleSubmit(data) {
    // Widget.submitPayload(this, config.apiUrl + 'contacts', data.contacts);
    let widget = this.props.widget;
    const assignProps = (toSet, setData) => {
      this.props.submitFields.map((field) => {
        if(setData[field] || setData[field] === false) {
          toSet[field] = setData[field];
        }
      });
      return toSet;
    }

    if(widget && widget.status !== 'posting') {
      let calls = [];
      data.contacts.map((contact, index) => {
        // Existing record
        if(contact._id) {
          let contactData = objectAssign({}, widget.data.contacts[index]);
          calls.push({
            method: 'PATCH',
            url: config.apiUrl + 'contacts/' + contact._id,
            data: assignProps({}, contact)
          });
        } 
        // New item
        else {
          calls.push({
            method: 'POST',
            url: config.apiUrl + 'contacts',
            data: assignProps({}, contact)
          });
        }
      });
      // Launch all actions
      this.props.actions.widgetPostAllData(this.props.widgetName, calls).then(
        this.props.actions.widgetLoadData(this.props.widgetName, config.apiUrl + 'contacts', this.processData)
      );
    }
    
  }

  contactsDelete(contact) {
    // Launch all actions
    let calls = [
      {
        method: 'DELETE',
        url: config.apiUrl + 'contacts/' + contact._id,
        data: contact
      }
    ];
    this.props.actions.widgetPostAllData(this.props.widgetName, calls).then(
      this.props.actions.widgetLoadData(this.props.widgetName, config.apiUrl + 'contacts', this.processData)
    );
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || !(widget.status === 'loaded' || widget.status === 'posting')) {
      return Widget.loadingDisplay();
    }

    if(this.props.display === 'page') {
      return (
        <ContactsEditPage 
          header={Widget.titleSection('Edit contacts', false, 'h2', false, true)} 
          contactsData={widget.data.contacts}
          contactsSubmit={this.handleSubmit.bind(this)}
          contactsDelete={this.contactsDelete.bind(this)}
          emptyText={this.emptyText()}
          backLink={Widget.backLink('Cancel', 'btn btn-default')} />
      )
    }
    else {
      return (
        <ContactsWidget 
          header={Widget.titleSection('Contact Matrix', this.props.widgetName)} 
          contacts={widget.data.contacts}
          emptyText={this.emptyText()} />
      )
    }
  }
}

Contacts.propTypes = Widget.propTypes({
  submitFields: PropTypes.array
});
Contacts.defaultProps = Widget.defaultProps({
  submitFields: [
    'name',
    'email',
    'responsibility',
    'phone'
  ]
});

export default Widget.connect(Contacts);