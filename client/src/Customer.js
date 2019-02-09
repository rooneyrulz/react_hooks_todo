import React from 'react';
import PropTypes from "prop-types";

export default function Customer({ customer, onDelete }) {

  function onHandleDelete(id) {
    onDelete(id);
  }

  return <li className="list-group-item">
    <span onClick={ onHandleDelete.bind(this, customer._id) } className="close float-right text-danger">&times;</span>
    { customer.name }
  </li>
}


Customer.propTypes = {
  customer: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}
