const express = require('express');
const router = express.Router();
const TourPackage = require('../models/TourPackage');
router.get('/', async (req, res) => {
  try {
    const packages = await TourPackage.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', getTourPackage, (req, res) => {
  res.json(res.tourPackage);
});
router.post('/', async (req, res) => {
  const package = new TourPackage(req.body);
  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', getTourPackage, async (req, res) => {
  Object.assign(res.tourPackage, req.body);
  try {
    const updatedPackage = await res.tourPackage.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', getTourPackage, async (req, res) => {
  try {
    await res.tourPackage.deleteOne();
    res.json({ message: 'Tour Package Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
async function getTourPackage(req, res, next) {
  let tourPackage;
  try {
    tourPackage = await TourPackage.findById(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Cannot find tour package' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.tourPackage = tourPackage;
  next();
}
module.exports = router;
