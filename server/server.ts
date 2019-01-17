import App from './app';
import { CustomLogger } from './utils/logger';
import config from './config';
require('dotenv').load();

const server = new App();

if (config.get('env') !== 'test') {
	server.app.listen(config.get('port'), () => {
		CustomLogger.logger.info(`App Serve started`, config.get('port'));
		CustomLogger.logger.info(`NodeEnv`, process.env.NODE_ENV);
	});
}

process
	.on('unhandledRejection', (reason, p) => {
		CustomLogger.logger.error(`Unhandled Rejection at Promise`, reason, p);
	})
	.on('uncaughtException', err => {
		CustomLogger.logger.error(`Uncaught Exception message`, err.message);
		CustomLogger.logger.error(`Uncaught Exception stack`, err.stack);
		process.exit(1);
	});

export default server;
