import React, { Component } from 'react';
import config from 'config/';
import Widget from '../../Widget';
import AccountsWidget from './AccountsWidget';
import InactiveAccountsWidget from './InactiveAccountsWidget';

class Accounts extends Component {

  constructor(props) {
    super(props);
    Widget.registerWidget(this, props);
  }

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'accounts', this.processData);
  }

  processData (data) {
    return {
      accounts: data
    };
  }

  render () {
    let widget = this.props.widget;

    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    // Inactive
    if(this.props.widgetType === 'inactive') {
      // @ TODO?
      if(this.props.display === 'page') {
        return (
          <div>InactiveAccountsPage</div>
        )
      }
      else {
        return (
          <InactiveAccountsWidget
            header={Widget.titleSection('Inactive Accounts', '/wp-admin/users.php', 'h3', true)} 
            accounts={widget.data.accounts} />
        )
      }
    }
    // Normal accounts widget
    else {
      
      let admins = 0;
      let totalAccounts = 0;
      // Compile data
      if (widget.data && widget.data.accounts && widget.data.accounts.length) {
        widget.data.accounts.map((account) => {
          if (account.role && account.role == 'super admin') {
            admins++;
          }
        });
        totalAccounts = widget.data.accounts.length;
      }

      // @TODO?
      if(this.props.display === 'page') {
        return (
          <div>AccountsPage</div>
        )
      }
      else {
        return (
          <AccountsWidget
            admins={admins}
            totalAccounts={totalAccounts} 
            footer={Widget.panelFooter(totalAccounts + ' total accounts', '/wp-admin/users.php', true)} />
        )
      }
    }
  }
}

Accounts.propTypes = Widget.propTypes();
Accounts.defaultProps = Widget.defaultProps();

export default Widget.connect(Accounts);
