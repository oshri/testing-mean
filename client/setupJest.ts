import 'jest-preset-angular';

// global['CSS'] = null;

const mock = () => {
	let storage = {};
	return {
		getItem: (key) => (key in storage ? storage[key] : null),
		setItem: (key, value) => (storage[key] = value || ''),
		removeItem: (key) => delete storage[key],
		clear: () => (storage = {})
	};
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'open', { value: () => {} });
Object.defineProperty(document, 'doctype', {
	value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
	value: () => {
		return {
			display: 'none',
			appearance: [ '-webkit-appearance' ],
			getPropertyValue: (prop) => {
				return '';
			}
		};
	}
});

Object.defineProperty(document.body.style, 'transform', {
	value: () => {
		return {
			enumerable: true,
			configurable: true
		};
	}
});

Object.defineProperty(window, 'matchMedia', {
	value: () => ({
		matches: false,
		addListener: () => {},
		removeListener: () => {}
	})
});

/**
 * Suppress console warnings
 */
const WARN_SUPPRESSING_PATTERNS = [ /Hammer\.JS is not loaded/ ];
const warn = console.warn;
Object.defineProperty(console, 'warn', {
	value: (...params: string[]) => {
		if (
			!WARN_SUPPRESSING_PATTERNS.some((pattern) =>
				pattern.test(params[0])
			)
		) {
			warn(...params);
		}
	}
});
