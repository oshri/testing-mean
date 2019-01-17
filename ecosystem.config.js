module.exports = {
	apps: [
		{
			name: 'bc-connector',
			script: './dist/server/server.js',
			instances: 3,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				PORT: 3000,
				NODE_ENV: 'development'
			},
			env_production: {
				PORT: 80,
				NODE_ENV: 'production'
			}
		}
	]
};
