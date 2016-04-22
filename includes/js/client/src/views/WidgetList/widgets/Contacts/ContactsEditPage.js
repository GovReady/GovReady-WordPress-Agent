import React, { PropTypes, Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
export const fields = [
  'contacts[].role',
  'contacts[].email',
  'contacts[].phone'
];

class PureInput extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field
  }

  render() {
    const { field, ...rest } = this.props
    return <input className="form-control" {...field} {...rest}/>
  }
}

PureInput.propTypes = {
  field: PropTypes.object.isRequired
}

class ContactsEditPage extends Component {

  componentWillMount() {
    console.log('contactsssss');
    console.log(this.props.contacts);
    // this.props.dispatch(initialize('contactsEdit', {
    //   contacts: this.props.contacts
    // }, ['contacts']));
  }

  contactArea(contacts) {
    if(contacts && contacts.length) {
      return (
        <div className="contacts-edit">
          {contacts.map((contact, index) => (
            <fieldset key={index}>
              <div className="form-group">
                <label>Contact title</label>
                <PureInput type="text" field={contact.role}/>
              </div>
              <div className="form-group">
                <label>Email</label>
                <PureInput type="email" field={contact.email}/>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <PureInput type="text" field={contact.phone}/>
              </div>
              <div>
                <button className="btn btn-danger" type="button" onClick={() => {
                  contacts.removeField(index)  // remove from index
                }}><i className="fa fa-trash"></i> <span className="sr-only">Remove</span>
                </button>
              </div>
            </fieldset>
          ))}
        </div>
      );
    }
    return this.props.emptyText;
  }

  editForm() {
    // Extract props
    const { fields: { contacts }, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        {this.contactArea(contacts)}
        <div>
          <button className="btn btn-info" type="button" onClick={() => {
            console.log(contacts);
            contacts.addField({
              role: '',
              email: '',
              phone: ''
             }, contacts.length);
             // addContact('contactsEdit', 'contacts')
          }}><i/> Add Contact
          </button>
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          {this.props.backLink}
        </div>
      </form>
    )
  }

  render () {
    return (
      <div>
        {this.props.header}
        {this.editForm()}
      </div>
    );
  }
}

ContactsEditPage.propTypes = {
  header: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  emptyText: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  backLink: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'contactsEdit',
  fields
},
(state, ownProps) => ({
  initialValues: {
    'contacts': ownProps.contacts
  }
}))(ContactsEditPage);