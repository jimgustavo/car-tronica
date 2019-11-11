const express = require("express");
const router = express.Router();

// Billing Model
const Billing = require("../models/billings");

// @route  GET api/billings
// @desc   Get All Billing
// @access Public
router.get("/", (req, res) => {
  // if weren't using routers should be /api/items
  Billing.find()
    .sort({ date: -1 }) //desc
    .then(billings => res.json(billings));
});

// @route  POST api/billings
// @desc   Create an Billing
// @access Public
router.post("/", (req, res) => {
  const newBilling = new Billing({
    firstName: req.body.firstName, //bodyParser enable it
    lastName: req.body.lastName,
    dni: req.body.dni,
    phone: req.body.phone,
    line1: req.body.line1,
    line2: req.body.line2,
    houseNumber: req.body.houseNumber
  });

  newBilling
    .save()
    .then(billing => res.json(billing))
    .catch(er => res.json(er));
});

// @route  PUT api/billings/:id
// @desc   Update an Billing
// @access Public
router.put("/:id", (req, res) => {
  let id = req.params.id;
  //{ name: req.body.name } // {new: true} return updated element
  Billing.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(billing => res.json(billing))
    .catch(er =>
      res.status(404).json({
        success: false,
        parmitem: req.params.id,
        bodyitem: req.body._id
      })
    );
});

// @route  DELETE api/billings/:id
// @desc   Delete an Billing
// @access Public
router.delete("/:id", (req, res) => {
  Billing.findById(req.params.id)
    .then(billing =>
      billing
        .remove()
        .then(() => res.json({ success: true, billing: req.params.id }))
    )
    .catch(er =>
      res.status(404).json({ success: false, billing: req.params.id })
    );
});

module.exports = router;
