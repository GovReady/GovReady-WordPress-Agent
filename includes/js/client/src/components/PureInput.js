import React, { PropTypes as PT, Component } from 'react';

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
  field: PT.object.isRequired
}

export default PureInput;