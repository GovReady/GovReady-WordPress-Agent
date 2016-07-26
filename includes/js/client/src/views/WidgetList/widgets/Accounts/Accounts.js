import React, { Component } from 'react';
import config from 'config/';
import Widget from '../Widget';
import AccountsWidget from './AccountsWidget';
import InactiveAccountsWidget from './InactiveAccountsWidget';
import { Link } from 'react-router';

class Accounts extends Component {

  componentWillMount () {
    Widget.registerWidget(
      this, 
      {
        url: config.apiUrl + 'accounts',
        process: this.processData
      }
    );
  }

  processData (data) {
    return {
      accounts: data.map((user) => {
        if( !user.lastLogin ) {
          return user;
        }
        let loginInt = parseInt(user.lastLogin);    
        // string   
        if(isNaN(loginInt)) {   
          user.lastLogin = false;
          return user; 
        }   
        // php timestamp convert
        let lastLogin = window.moment(loginInt*1000);
        if(!lastLogin || !lastLogin._isAMomentObject) {
          user.lastLogin = false;
          return user; 
        }
        user.lastLogin = lastLogin.format('MMMM Do YYYY, h:mm:ss a');
        return user;
      })
    };
  }

  // Returns accounts filtered by if they have lastLogin or not
  getInactiveAccounts() {
    return this.props.widget.data.accounts.filter((user) => {
      if( !user.lastLogin ) {
        return false;
      }      
      const lastLogin = window.moment(user.lastLogin, 'MMMM Do YYYY, h:mm:ss a');
      const days = window.moment().diff(lastLogin, 'days');
      console.log(days);
      return days && days % 1 === 0 && days > 30 && days < 10000;
    });
  }

  render () {
    let widget = this.props.widget;

    // Return loading if not set
    if(!widget || widget.status !== 'loaded') {
      return Widget.loadingDisplay();
    }

    let userUrl, adminRole;
    // CMS Specific
    switch(config.cms) {  
      case 'wordpress':
        adminRole = 'administrator';
        userUrl = '/wp-admin/users.php';
        break;
      case 'drupal':
        adminRole = 'administrator'; 
        userUrl = '/admin/people';
        break;
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
        const subHeader = () => {
          return (
            <h5>Are these users still in your organization?  <a href={userUrl}>Edit them</a>.  If not, <a href={userUrl}>delete them</a>.</h5>
          );
        }
        return (
          <InactiveAccountsWidget
            header={Widget.titleSection('Inactive Accounts', userUrl, 'h3', true)} 
            subHeader={subHeader()}
            accounts={this.getInactiveAccounts()} />
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
          if (account.superAdmin) {
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
            footer={Widget.panelFooter(totalAccounts + ' total accounts', userUrl, true)} />
        )
      }
    }
  }
}

Accounts.propTypes = Widget.propTypes();
Accounts.defaultProps = Widget.defaultProps();

export default Widget.connect(Accounts);
