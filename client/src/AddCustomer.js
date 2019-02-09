import React, { useState } from 'react';
import PropTypes from "prop-types";

export default function AddCustomer({ addCustomer }) {

  const [customer, setCustomer] = useState("");

  let btnStyle = {
    backgroundColor: '#333',
    color: '#f4f4f4'
  };

  return (
    <div>
      <form onSubmit={ onHandleAddCustomer }>
        <div className="form-group mb-0">
          <input type="text" name="name" className="form-control form-control-lg" placeholder="Enter Customer" 
          onChange={ onHandleChange } />
        </div>
        <button style={ btnStyle } className="btn btn-lg btn-block">ADD CUSTOMER</button>
      </form>
    </div>
  )

  function onHandleChange(e) {
    setCustomer(e.target.value);
  }

  function onHandleAddCustomer(e) {
    e.preventDefault();
    let newCustomer = {
      name: customer
    };
    addCustomer(newCustomer);
    e.target.reset();
  }

}


AddCustomer.propTypes = {
  addCustomer: PropTypes.func.isRequired
}