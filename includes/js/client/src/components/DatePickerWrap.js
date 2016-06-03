import React, { PropTypes, Component } from 'react';
import DatePicker from 'react-datepicker';
// Css
require('react-datepicker/dist/react-datepicker.css');

class DatePickerWrap extends Component {
  render() {
    const { field, ...rest } = this.props
    let selected;
    if(field.value) {
      selected = field.value._isAMomentObject 
               ? field.value 
               : window.moment(field.value, "MMMM Do YYYY").isValid()
                 ? window.moment(field.value, "MMMM Do YYYY")
                 : window.moment(field.value);
    }
    else {
      selected = window.moment();
    } 
    return (
      <DatePicker
        {...field}
        {...rest}
        dateFormat="MMMM Do YYYY"
        className='form-control'
        selected={selected} />
    )
  }
}

DatePickerWrap.propTypes = {
  field: PropTypes.object.isRequired
}

export default DatePickerWrap;