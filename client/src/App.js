import React, { useState, useEffect } from "react";

import "./App.css";

import AddCustomer from "./AddCustomer";
import Customer from "./Customer";

import { getCustomers, addNewCustomer, deleteCustomer } from "./helpers/";

export default function App(props) {
  const getState = useState("REACT HOOKS");
  let [customers, setCustomer] = useState([]);
  const [counter] = useState(0);

  useEffect(() => {
    onLoadCustomers();
  }, [counter]);


  //Getting All Of The Customers
  function onLoadCustomers() {
    getCustomers(`/api/customers`)
      .then(res => {
        let { customers } = res.data;
        setCustomer(customers);
      })
      .catch(err => {
        throw err.message;
      });
  }



  //Deleting Customers
  function onDeleteCustomer(id) {
    setCustomer(customers.filter(customer => customer._id !== id));
    deleteCustomer(`/api/customer`, id)
      .then(res => {
        const { deleted } = res.data;
        console.log(deleted);
      })
      .catch(err => {
        throw err.message;
      });
  }


  //Adding Customers
  function addCustomer(newCustomer) {
    if (newCustomer.name !== "") {
      setCustomer([...customers, newCustomer]);
      addNewCustomer(`/api/customer/add`, newCustomer)
        .then(res => {
          const { customer } = res.data;
          console.log(customer);
        })
        .catch(err => {
          throw err.message;
        });
    } else {
      alert(`Please Enter Customer...`);
    }
  }

  let newCustomersList =
    customers.length ? (
      customers.map(customer => {
        return (
          <Customer
            customer={customer}
            onDelete={onDeleteCustomer}
            key={customer._id}
          />
        );
      })
    ) : (
      <li className="list-group-item text-danger text-center">
        No Customers Added Yet..
      </li>
    );

  return (
    <div className="App container">
      <h1 className="text-center text-light p-3">{getState}</h1>
      <br />
      <div className="App-container">
        <ul className="list-group mb-2">{newCustomersList}</ul>
        <AddCustomer addCustomer={addCustomer.bind(this)} />
      </div>
      <br />
    </div>
  );
}
