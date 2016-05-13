import React, { Component, PropTypes } from 'react';
import config from 'config';
import Widget from '../../Widget';
import ContactsWidget from './ContactsWidget';
import ContactsEditPage from './ContactsEditPage';
import objectAssign from 'object-assign';
import { Link } from 'react-router';

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

  emptyText(includeLink) {
    return (
      <div className="alert alert-warning">
        <span>No contact information completed. Please </span>
        {includeLink && (
          <Link to='/section/Contacts'>add some!</Link>
        )}
        {!includeLink && (
          <span>add some!</span>
        )}
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
    if(contact._id && contact._id.value) {
      let calls = [
        {
          method: 'DELETE',
          url: config.apiUrl + 'contacts/' + contact._id.value,
          data: contact
        }
      ];
      this.props.actions.widgetPostAllData(this.props.widgetName, calls).then(
        this.props.actions.widgetLoadData(this.props.widgetName, config.apiUrl + 'contacts', this.processData)
      );
    }
    else {
      //error
    }
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
      const subHeader = () => {
        return (
          <h5>Keep this handy list <Link to='/section/Contacts'>updated</Link> with important contacts to maintain your site</h5>
        )
      }
      return (
        <ContactsWidget 
          header={Widget.titleSection('Points of Contact to Maintain your Site', this.props.widgetName)} 
          subHeader={widget.data.contacts.length ? subHeader() : false}
          contacts={widget.data.contacts}
          emptyText={this.emptyText(true)} />
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