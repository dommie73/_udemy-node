const { Order } = require('../../models');
const generateInvoice = require('../../utils/invoice');

const getInvoice = async (req, res, next) => {
	try {
		const { user } = req;
		const { id: orderId } = req.params;
		const order = await Order.findOne({ _id: orderId, userId: user._id });

		if (order) {
			return generateInvoice(res, order, user);
		}

		req.flash('error', 'You are not authorized to view this invoice.');
		req.saveSessionAndRedirect('/orders');
	} catch (err) {
		next(err);
	}
};

module.exports = getInvoice;
