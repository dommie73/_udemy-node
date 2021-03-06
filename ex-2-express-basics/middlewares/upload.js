const path = require('path');

const multer = require('multer');

const { dest } = require('../utils/files');
const { generateToken } = require('../utils/helpers');

const storage = multer.diskStorage({
	destination: dest.uploads.tmp,
	filename: (req, file, cb) => {
		generateToken(16)
			.then(token => Date.now() + token + path.extname(file.originalname))
			.then(randomizedFilename => cb(null, randomizedFilename))
			.catch(err => cb(err));
	}
});

const upload = (field, fileFilter, limits) => {
	const multerUpload = multer({ fileFilter, limits, storage }).single(field);
	return function(req, res, next) {
		multerUpload(req, res, function(err) {
			if (err instanceof multer.MulterError) {
				/*
					Delegate error to the custom body validator.
				*/
				req.body[field] = err;
			}
			next();
		});
	};
};

module.exports = upload;
