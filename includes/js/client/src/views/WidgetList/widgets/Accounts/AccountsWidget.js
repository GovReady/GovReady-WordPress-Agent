import React, { PropTypes, Component } from 'react';

class AccountsWidget extends Component {
  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h4>
            {this.props.admins}
            <br/>
            <small>super admins</small>
          </h4>
        </div>
        {this.props.footer}
      </div>
    );
  }
}

AccountsWidget.propTypes = {
  admins: PropTypes.number.isRequired,
  totalAccounts: PropTypes.number.isRequired,
  footer: PropTypes.object.isRequired
};

export default AccountsWidget;