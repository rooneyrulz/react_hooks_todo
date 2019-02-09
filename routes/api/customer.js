const express = require("express");
const mongoose = require("mongoose");

const router = express.Router({strict:true});

const Customer = require("../../models/customerSchema");

//@ Adding Customers
router.post('/customer/add', (req, res, next) => {
  let newCustomer = Customer({
    _id: new mongoose.Types.ObjectId,
    name: req.body.name
  });
  return newCustomer
    .save()
    .then(customer => {
      return res.status(200).json({ customer: customer });
    })
    .catch(err => {
      throw err.message;
    });
});


//@ Getting Customers
router.get('/customers', (req, res, next) => {
  return Customer
    .find()
    .select(' _id name date ')
    .exec()
    .then(customers => {
      if (customers.length < 1) {
        return res.status(404).json({
          message: 'no customers added yet...'
        });
      } else {
        return res.status(200).json({ customers: customers });
      }
    })
    .catch(err => {
      throw err.message;
    });
});



//@Deleting Customers
router.delete('/customer/:id', (req, res, next) => {
  return Customer
    .findOne({ _id: req.params.id })
    .exec()
    .then(customer => {
      if (!customer) {
        return res.status(409).json({
          message: `no customers found...`
        });
      }
      return Customer
        .deleteOne({ _id: req.params.id })
        .exec();
    })
    .then(deletedCustomer => {
      return res.status(200).json({
        deleted: deletedCustomer
      });
    })
    .catch(err => {
      throw err.message;
    });
});


module.exports = router;