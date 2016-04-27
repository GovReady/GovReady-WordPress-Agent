import React, { PropTypes, Component } from 'react';
import { reduxForm, initialize, propTypes } from 'redux-form';
export const fields = [
  'contacts[].responsibility',
  'contacts[].name',
  'contacts[].email',
  'contacts[].phone',
  'contacts[]._id',
  'contacts[].confirmDelete'
];

class DeleteConfirm extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.confirmDelete !== nextProps.confirmDelete
  }

  cancelClick(event) {
    event.preventDefault();
    this.props.deleteConfirm(false);
  }

  deleteClick(event) {
    event.preventDefault();
    this.props.deleteConfirm(true);
  }

  render() {
    const style = {
      marginLeft: this.props.confirmDelete ? '-100%' : 0
    };
    return (
      <div className="confirm-delete">
        <div className="confirm-inner" style={style}>
          <div>
            <button className="btn btn-danger" type="button" onClick={this.deleteClick.bind(this)}>
              <i className="fa fa-trash"></i> <span className="sr-only">Remove</span>
            </button>
          </div>
          <div>
            <span>Are you sure?</span>
            <button className="btn btn-danger" type="button" onClick={this.props.deleteFunc}>Yes</button>
            <button className="btn btn-default" type="button" onClick={this.cancelClick.bind(this)}>No</button>
          </div>
        </div>
      </div>
    )
  }
}

DeleteConfirm.propTypes = {
  confirmDelete: PropTypes.bool,
  index: PropTypes.number.isRequired,
  deleteConfirm: PropTypes.func.isRequired,
  deleteFunc: PropTypes.func.isRequired
}

DeleteConfirm.defaultProps = () => {
  return {
    confirmDelete: false
  }
}

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
    console.log(this.props.contactsData);
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
                <label>Name</label>
                <PureInput type="text" field={contact.name}/>
              </div>
              <div className="form-group">
                <label>Responsibility</label>
                <PureInput type="text" field={contact.responsibility}/>
              </div>
              <div className="form-group">
                <label>Email</label>
                <PureInput type="email" field={contact.email}/>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <PureInput type="text" field={contact.phone}/>
              </div>
              <DeleteConfirm 
                index={index} 
                confirmDelete={Boolean(contact.confirmDelete.value)}
                deleteConfirm={contact.confirmDelete.onChange}
                deleteFunc={() => { contacts.removeField(index) }} />
            </fieldset>
          ))}
        </div>
      );
    }
    return this.props.emptyText;
  }

  editForm() {
    // Extract props
    const { fields: { contacts }, handleSubmit, contactsSubmit, deleteConfirm, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(contactsSubmit)}>
        {this.contactArea(contacts)}
        <div>
          <button className="btn btn-info" type="button" onClick={() => {
            console.log(contacts);
            contacts.addField({
              responsibility: '',
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
  ...propTypes,
  header: PropTypes.object.isRequired,
  contactsData: PropTypes.array.isRequired,
  emptyText: PropTypes.object.isRequired,
  contactsSubmit: PropTypes.func.isRequired,
  backLink: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'contactsEdit',
  fields
},
(state, ownProps) => ({
  initialValues: {
    'contacts': ownProps.contactsData
  }
})
)(ContactsEditPage);