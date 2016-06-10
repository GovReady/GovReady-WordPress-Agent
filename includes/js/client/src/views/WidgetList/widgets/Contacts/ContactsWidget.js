import React, { Component, PropTypes as PT } from 'react';
import {isoToDate} from 'utils/date';

class ContactsWidget extends Component {

  listContactsTable (contacts = [], emptyText) {
    if(contacts && contacts.length) {
      return (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>
                  What to call them for
                </th>
                <th>
                  Email
                </th>
                <th>
                  Phone
                </th>
                <th>
                  Last Confirmed
                </th>
              </tr>
            </thead>
            <tbody>
             {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.responsibility}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.lastConfirmed ? isoToDate(contact.lastConfirmed) : "Never"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return emptyText;
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.props.subHeader}
        {this.listContactsTable(this.props.contacts, this.props.emptyText)}
        {this.props.footer}
      </div>
    );
  }
}

ContactsWidget.propTypes = {
  header: PT.object,
  subHeader: PT.object,
  contacts: PT.array.isRequired,
  emptyText: PT.object.isRequired,
  footer: PT.object
};

export default ContactsWidget;
