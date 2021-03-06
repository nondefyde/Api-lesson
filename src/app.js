import express from 'express';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';

import todo from './api/todo/todo.route';
import auth from './api/auth/auth.route';
import errorHandler from './middleware/errors';

const app = express();

const port = 3000;
const prefix = '/api/v1/';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.set('port', port);

app.use(prefix, auth);
app.use(prefix, todo);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Application listening on localhost:${port}`);
});



