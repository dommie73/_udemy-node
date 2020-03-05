const { Router } = require('express');

const addToCart = require('../controllers/shop/addToCart');
const createOrder = require('../controllers/shop/createOrder');
const deleteFromCart = require('../controllers/shop/deleteFromCart');
const getCart = require('../controllers/shop/getCart');
const getIndex = require('../controllers/shop/getIndex');
const getProducts = require('../controllers/shop/getProducts');
const getProductDetails = require('../controllers/shop/getProductDetails');

const router = Router();

router.get('/', getIndex);
router.get('/cart', getCart);
router.post('/cart', addToCart);
router.post('/cart/delete-product', deleteFromCart);
// router.get('/orders', shopControllers.getOrders);
router.post('/order', createOrder);
// router.get('/checkout', shopControllers.getCheckout);
router.get('/products', getProducts);
router.get('/products/:id', getProductDetails);

module.exports = router;
