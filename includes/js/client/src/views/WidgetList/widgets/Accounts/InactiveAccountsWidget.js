import React, { Component, PropTypes as PT } from 'react';

class InactiveAccountsWidget extends Component {

  listUsersTable (users) {
    // None
    if(!users || !users.length) {
      return (
        <div className="alert alert-info">
          <p>No inactive accounts</p>
        </div>
      )
    }
    // Joins roles
    const printRoles = (user) => {
      if(user.roles && user.roles.length) {
        return user.roles.join(', ');
      }
    }
    // // Last login
    // const printLastLogin = (user) => {
    //   let loginInt = parseInt(user.lastLogin);    
    //   // string   
    //   if(isNaN(loginInt)) {   
    //     return user.lastLogin;    
    //   }   
    //   // php timestamp
    //   return window.moment(loginInt*1000).format('MMMM Do YYYY');
    // }
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
                <td>{user.lastLogin}</td>
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
          {this.props.subHeader}
          {this.listUsersTable(this.props.accounts)}
        </div>
      </div>
    );
  }
}

InactiveAccountsWidget.propTypes = {
  header: PT.object,
  subHeader: PT.object,
  accounts: PT.array.isRequired
};

export default InactiveAccountsWidget;
