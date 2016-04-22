import React, { Component, PropTypes } from 'react';
import config from 'config';
import Widget from '../../Widget';
import ContactsWidget from './ContactsWidget';
import ContactsEditPage from './ContactsEditPage';

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
      contacts: [
        {role: "1", email: 'asdhjahs@asdhjkas.com', phone: '2-6-240121'}
      ]
    };
  }

  emptyText() {
    return (
      <div className="alert alert-warning">
        No contact information completed. Please add some!
      </div>
    );
  }

  handleSubmit() {
    console.log('submitting');
  }

  addContact() {
    console.log('adding');
  }

  render () {

    let widget = this.props.widget;
    
    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    if(this.props.display === 'page') {
      return (
        <ContactsEditPage 
          header={Widget.titleSection('Edit contacts', false)} 
          contacts={widget.data.contacts}
          addContact={this.addContact}
          handleSubmit={this.handleSubmit}
          emptyText={this.emptyText()}
          backLink={Widget.backLink('Cancel', 'btn btn-default')} />
      )
    }
    else {
      return (
        <ContactsWidget 
          header={Widget.titleSection('Contact Matrix', false)} 
          contacts={widget.data.contacts}
          emptyText={this.emptyText()}
          footer={Widget.panelFooter('Edit', this.props.widgetName)} />
      )
    }
  }
}

Contacts.propTypes = Widget.propTypes({
  submitting: PropTypes.bool
});
Contacts.defaultProps = Widget.defaultProps({
  submitting: false
});

export default Widget.connect(Contacts);