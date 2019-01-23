import * as convict from 'convict';
import * as path from 'path';

const CONFIG = () => {
	const configSchema = convict({
		env: {
			doc: 'The application environment',
			format: ['production', 'development', 'test'],
			default: 'development',
			env: 'NODE_ENV'
		},
		logLevel: {
			doc: 'Log Level',
			format: Object.keys(require('winston').config.syslog.levels),
			default: 'info',
			env: 'LOG_LEVEL'
		},
		port: {
			doc: 'Port to listen on',
			format: Number,
			default: 8080,
			env: 'PORT'
		},
		mongodbUri: {
			doc: "URL of MongoDB",
			format: String,
			env: "MONGODB_URI"
		}
	});

	const node_env = configSchema.get('env');
	const root = process.env.NODE_ENV === 'production' ? '../../' : '../';

	const file = path.join(__dirname, `${root}/config/${node_env}.json`);
	configSchema.loadFile(file);
	configSchema.validate({ allowed: 'strict' });
	configSchema.set('service.version', require(path.join(__dirname, `${root}/package.json`)).version);

	return configSchema;
};

export default CONFIG();
