const { GraphQLString } = require('graphql');

const ErrorHandler = require('../../../utils/ErrorHandler');
const { Post: PostModel } = require('../../../models');
const { Post: PostType } = require('../../types');
const { post: validatePost } = require('../../../validators/feed');

const createPost = {
	type: PostType,
	args: {
		title: { type: GraphQLString },
		content: { type: GraphQLString },
		image: { type: GraphQLString }
	},
	resolve: async function (source, args, { isAuthenticated, user }) {
		if (!isAuthenticated) {
			throw new ErrorHandler(401, 'Invalid credentials.');
		}

		const errors = await validatePost(args);

		if (errors.length > 0) {
			throw new ErrorHandler(422, 'Post validation failed.', errors);
		}

		/* temporarily fixed image to avoid GraphQL errors */
		const post = await PostModel.create({
			...args,
			image: 'placeholder.jpg',
			creator: user
		});

		return post;
	}
};

module.exports = createPost;