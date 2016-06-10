import React, { PropTypes as PT, Component } from 'react';
import DatePicker from 'react-datepicker';
import config from 'config';

// Css
require('react-datepicker/dist/react-datepicker.css');

class DatePickerWrap extends Component {
  render() {
    const { field, ...rest } = this.props
    let selected;
    if(field.value && field.value !== 'undefined' && field.value !== 'null') {
      selected = field.value._isAMomentObject 
               ? field.value 
               : window.moment(field.value, config.dateFormat).isValid()
                 ? window.moment(field.value, config.dateFormat)
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
  field: PT.object.isRequired
}

export default DatePickerWrap;