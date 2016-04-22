import React, { Component } from 'react';
import config from '../../../config/';
import Widget from '../Widget';

class InactiveAccountsWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'accounts');
  }

  processData (data) {
    return {
      accounts: data
    };
  }

  listUsersTable (users) {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
          </thead>
            <th>
              User
            </th>
            <th>
              Last Login
            </th>
          <tbody>
           {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.lastLogin ? user.lastLogin : 'Never'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    let widget = this.props.widget;
    return (
      <div className='widget account-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' && widget.data.accounts &&
          <div>
            {Widget.titleSection('Inactive Accounts', 'h3', false)}
            <h5>Are these users still in your organization?</h5>
            {this.listUsersTable(widget.data.accounts)}
          </div>
        }
      </div>
    );
  }
}

InactiveAccountsWidget.propTypes = Widget.propTypes();

export default Widget.connect(InactiveAccountsWidget);
