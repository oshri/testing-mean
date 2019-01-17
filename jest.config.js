module.exports = {
	preset: 'jest-preset-angular',
	testURL: 'http://localhost',
	moduleNameMapper: {
		'@sk-shared/(.*)': '<rootDir>/client/app/modules/shared/$1'
	},
	setupTestFrameworkScriptFile: '<rootDir>/client/setupJest.ts',
	globals: {
		__TRANSFORM_HTML__: true,
		'ts-jest': {
			tsConfigFile: 'client/tsconfig.spec.json'
		}
	},
	transform: {
		'^.+\\.(tsx?|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js'
	},
	testMatch: ['**/__tests__/**/*.+(ts|js)?(x)', '**/+(*.)+(spec|test).+(ts|js)?(x)'],
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/puppeteer/', '<rootDir>/server'],
	moduleFileExtensions: ['ts', 'js', 'html'],
	testResultsProcessor: 'jest-teamcity-reporter',
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 70,
			statements: 70
		}
	},
	coverageReporters: ['json', 'lcov', 'text', 'teamcity']
};
