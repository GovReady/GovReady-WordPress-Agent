import React, { PropTypes as PT, Component } from 'react';

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
  confirmDelete: PT.bool,
  index: PT.number.isRequired,
  deleteConfirm: PT.func.isRequired,
  deleteFunc: PT.func.isRequired
}

DeleteConfirm.defaultProps = () => {
  return {
    confirmDelete: false
  }
}

export default DeleteConfirm;