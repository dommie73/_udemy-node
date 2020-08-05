const debug = require('debug')('app:main');
const express = require('express');

const connectToDb = require('./database');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(middlewares.cors);

app.use('/feed', routes.feed);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorHandler);

connectToDb().then(() => {
	const listener = app.listen(process.env.PORT, () => {
		debug('listening on port %d', listener.address().port);
	});
});
