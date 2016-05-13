import React, { Component, PropTypes } from 'react';

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
                  <td>{contact.lastConfirmed ? contact.lastConfirmed : "Never"}</td>
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
  header: PropTypes.object,
  subHeader: PropTypes.object,
  contacts: PropTypes.array.isRequired,
  emptyText: PropTypes.object.isRequired,
  footer: PropTypes.object
};

export default ContactsWidget;
