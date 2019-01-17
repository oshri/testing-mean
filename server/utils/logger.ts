import * as winston from 'winston';
import config from '../config';
const { combine, timestamp, label, prettyPrint } = winston.format;

const addLabel = winston.format((info, opts) => {
	if (opts.label) {
		info.label = opts.label;
	}
	return info;
});

export class CustomLogger {
	static logger = winston.createLogger({
		level: config.get('logLevel'),
		format: winston.format.combine(
			addLabel({ label: label }),
			winston.format.timestamp(),
			winston.format.splat(),
			winston.format.json()
		),

		transports: [new winston.transports.File({ filename: 'combined.log' }), new winston.transports.Console()]
	});
}
