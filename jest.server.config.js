module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'server/tsconfig.spec.json',
			diagnostics: true
		}
	},
	moduleFileExtensions: ['ts', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
	},
	testMatch: ['**/server/**/*.spec.(ts|js)'],
	testEnvironment: 'node'
};
