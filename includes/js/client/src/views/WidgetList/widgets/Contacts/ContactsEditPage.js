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
            <div>Are you sure?</div>
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

  contactArea(contacts,contactsDelete) {
    if(contacts && contacts.length) {
      return (
        <div className="contacts-edit">
          {contacts.map((contact, index) => (
            <fieldset key={index}>
              <div className="row">
                <div className="col-sm-9 col-md-10">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-sm-5 col-md-4 control-label">Name</label>
                        <div className="col-sm-7 col-md-8">
                          <PureInput type="text" field={contact.name}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-5 col-md-4 control-label">Responsibility</label>
                        <div className="col-sm-7 col-md-8">
                          <PureInput type="text" field={contact.responsibility}/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="col-sm-5 col-md-4 control-label">Email</label>
                        <div className="col-sm-7 col-md-8">
                          <PureInput type="email" field={contact.email}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-5 col-md-4 control-label">Phone Number</label>
                        <div className="col-sm-7 col-md-8">
                          <PureInput type="text" field={contact.phone}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 col-md-2">
                  <DeleteConfirm 
                    index={index} 
                    confirmDelete={Boolean(contact.confirmDelete.value)}
                    deleteConfirm={contact.confirmDelete.onChange}
                    deleteFunc={() => { 
                      if(contact._id && contact._id.value) {
                        contactsDelete(contact);
                      }
                      contacts.removeField(index);
                    }} />
                </div>
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
    const { fields: { contacts }, handleSubmit, contactsSubmit, contactsDelete, submitting } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(contactsSubmit)}>
        {this.contactArea([], contactsDelete)}
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
  contactsDelete: PropTypes.func.isRequired,
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