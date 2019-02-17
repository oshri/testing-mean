import * as dotenv from 'dotenv';
import config from './config';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import root from './utils/root';
import { db } from './db';
import * as express from 'express';
import * as path from 'path';

dotenv.config();

// Routes
import { ProjectsRoute } from './routes/projects';

class App {
	public app: any;

	public constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	private config() {
		this.app.use(bodyParser.json());

		db(config.get('mongodb').uri);

		this.app.use(
			bodyParser.urlencoded({
				extended: false
			})
		);

		this.app.use(logger('dev'));

		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			err.status = 404;
			next(err);
		});

		this.app.disable('x-powered-by');
	}

	private routes() {
		let router: express.Router;
		router = express.Router();

		ProjectsRoute.createRoutes(router);

		this.app.use('/api', router);

		// TODO: we need to build index.html static file with projectlogo and api version :)
		// this.app.use('/', express.static(root('./public')));
		// this.app.get('/*', (req: express.Request, res: express.Response) => {
		// 	res.sendFile(root('./public/index.html'));
		// });
	}
}

export default App;
