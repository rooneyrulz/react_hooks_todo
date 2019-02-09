const Axios = require("axios");


//Getting All Customers
export const getCustomers = (uri) => {
  return Axios
    .get(uri);
}


//Adding Customers
export const addNewCustomer = (uri, customer) => {
  return Axios
    .post(uri, customer);
}


//Deleting Customers
export const deleteCustomer = (uri, id) => {
  return Axios
    .delete(`${uri}/${id}`);
}