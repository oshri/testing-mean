import * as mongoose from 'mongoose';
import { CustomLogger } from './utils/logger';

const db = (url) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		reconnectTries: Number.MAX_VALUE
	});

	mongoose.connection.on('error', function(error) {
		CustomLogger.logger.log('error', `mongodb error: ${error}`);
		process.exit(1);
	});
	mongoose.connection.on('disconnected', function() {
		CustomLogger.logger.log(
			'info',
			`disconnected from mongodb server ${url}: will try to reconnect`
		);
	});
	mongoose.connection.on('connected', function() {
		CustomLogger.logger.log('info', `connected to mongodb server ${url}`);
	});
	mongoose.connection.on('reconnected', function() {
		CustomLogger.logger.log('info', `reconnected to mongodb server ${url}`);
	});
};

export { db };
