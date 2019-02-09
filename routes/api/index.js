const express = require("express");
const router = express.Router({strict:true});


router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: "Yay! It's working..."
  });
});


module.exports = router;