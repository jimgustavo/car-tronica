const express = require("express");
const router = express.Router();

// Product Model
const Good = require("../models/stock");

// @route  GET api/stock
// @desc   Get All Good
// @access Public
router.get("/", (req, res) => {
  // if weren't using routers should be /api/products
  Good.find()
    .sort({ date: -1 }) //desc
    .then(goods => res.json(goods));
});

// @route  POST api/stock
// @desc   Create a Good
// @access Public
router.post("/", (req, res) => {
  const newGood = new Good({
    productName: req.body.productName, //bodyParser enable it
    description: req.body.description,
    keywords: req.body.keywords,
    image: req.body.image,
    price: req.body.price
  });

  newGood
    .save()
    .then(good => res.json(good))
    .catch(er => res.json(er));
});
// @route  PUT api/stock/:id
// @desc   Update a Good
// @access Public
router.put("/:id", (req, res) => {
  let id = req.params.id;
  //{ name: req.body.name } // {new: true} return updated element
  Good.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(good => res.json(good))
    .catch(er =>
      res.status(404).json({
        success: false,
        parmitem: req.params.id,
        bodyitem: req.body._id
      })
    );
});

// @route  DELETE api/stock/:id
// @desc   Delete an Good
// @access Public
router.delete("/:id", (req, res) => {
  Good.findById(req.params.id)
    .then(good =>
      good.remove().then(() => res.json({ success: true, good: req.params.id }))
    )
    .catch(er => res.status(404).json({ success: false, good: req.params.id }));
});

module.exports = router;
