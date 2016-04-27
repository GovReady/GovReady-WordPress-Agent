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
                  Contact Role
                </th>
                <th>
                  Email
                </th>
                <th>
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
             {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.responsibility}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
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
        {this.listContactsTable(this.props.contacts, this.props.emptyText)}
        {this.props.footer}
      </div>
    );
  }
}

ContactsWidget.propTypes = {
  header: PropTypes.object,
  contacts: PropTypes.array.isRequired,
  emptyText: PropTypes.object.isRequired,
  footer: PropTypes.object
};

export default ContactsWidget;
