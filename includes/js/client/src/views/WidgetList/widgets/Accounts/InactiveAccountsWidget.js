import React, { Component, PropTypes } from 'react';

class InactiveAccountsWidget extends Component {

  listUsersTable (users) {
    const printRoles = (user) => {
      if(user.roles) {
        return Object.keys(user.roles).join(', ');
      }
    }
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>
                User
              </th>
              <th>
                Roles
              </th>
              <th>
                Last Login
              </th>
            </tr>
          </thead>
          <tbody>
           {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{printRoles(user)}</td>
                <td>{user.lastLogin ? user.lastLogin : 'Never'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div className='widget account-widget'>
        <div>
          {this.props.header}
          <h5>Are these users still in your organization?</h5>
          {this.listUsersTable(this.props.accounts)}
        </div>
      </div>
    );
  }
}

InactiveAccountsWidget.propTypes = {
  header: PropTypes.object,
  accounts: PropTypes.array.isRequired
};

export default InactiveAccountsWidget;
