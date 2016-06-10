import React, { PropTypes as PT, Component } from 'react';
import { reduxForm, initialize, propTypes } from 'redux-form';
import PureInput from 'components/PureInput';
import DeleteConfirm from 'components/DeleteConfirm';
import DatePickerWrap from 'components/DatePickerWrap';
export const fields = [
  'contacts[].responsibility',
  'contacts[].name',
  'contacts[].email',
  'contacts[].phone',
  'contacts[].lastConfirmed',
  'contacts[]._id',
  'contacts[].confirmDelete'
];

class ContactsEditPage extends Component {

  componentWillMount() {
    console.log('contactsssss');
    console.log(this.props.contactsData);
    // this.props.dispatch(initialize('contactsEdit', {
    //   contacts: this.props.contacts
    // }, ['contacts']));
  }

  contactArea(contacts,contactsDelete) {
    const fieldClasses = (index) => {
      if(this.props.contactsData[index]) { 
        let classes = '';
        if(this.props.contactsData[index].unsaved) {
          classes += 'unsaved ';
        }
        if(this.props.contactsData[index].error) {
          classes += 'save-error';
        }
        return classes;
      }
    }
    const disabled = (index) => {
      if(this.props.contactsData[index] && this.props.contactsData[index].busy) {
        return true;
      }
      return false;
    }

    if(contacts && contacts.length) {
      return (
        <div className="contacts-edit">
          {contacts.map((contact, index) => (
            <fieldset key={index} disabled={disabled(index)} className={fieldClasses(index)}>
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
                        <label className="col-sm-5 col-md-4 control-label">What to call them for</label>
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
                    <div className="col-sm-6">
                      <div className="form-group">
                          <label className="col-sm-5 col-md-4 control-label">Last Confirmed</label>
                          <div className="col-sm-7 col-md-8">
                            <DatePickerWrap field={contact.lastConfirmed} placeholderText="Never Confirmed" />
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
        {this.contactArea(contacts, contactsDelete)}
        <div>
          <button className="btn btn-info" type="button" onClick={() => {
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
  header: PT.object.isRequired,
  contactsData: PT.array.isRequired,
  emptyText: PT.object.isRequired,
  contactsSubmit: PT.func.isRequired,
  contactsDelete: PT.func.isRequired,
  backLink: PT.object.isRequired
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