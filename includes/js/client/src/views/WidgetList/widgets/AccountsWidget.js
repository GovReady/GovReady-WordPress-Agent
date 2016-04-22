import React, { Component } from 'react';
import config from '../../../config/';
import Widget from '../Widget';

class AccountWidget extends Component {

  componentWillMount () {
    Widget.getPayload(this, config.apiUrl + 'accounts');
  }

  processData (data) {
    return {
      accounts: data
    };
  }

  render () {
    let widget = this.props.widget;
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
    return (
      <div className='widget account-widget'>
        {widget.status !== 'loaded' && Widget.loadingDisplay()}
        {widget.status === 'loaded' &&
          <div className='panel panel-default'>
            <div className='panel-body'>
              <h4>
                {admins}
                <br/>
                <small>super admins</small>
              </h4>
            </div>
            {Widget.panelFooter(totalAccounts + ' total accounts')}
          </div>
        }
      </div>
    );
  }
}

AccountWidget.propTypes = Widget.propTypes();

export default Widget.connect(AccountWidget);
