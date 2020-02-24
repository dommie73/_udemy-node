const Product = require('../../models/Product');

const getProducts = async (req, res) => {
	const products = await Product.findAll();
	res.render('shop/products-list', { pageTitle: 'Admin Products', products });
};

module.exports = getProducts;
