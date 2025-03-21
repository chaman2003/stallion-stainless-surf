const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

// Route to get products
router.get('/products', getProducts);

module.exports = router; 