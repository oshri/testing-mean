import * as path from 'path';
const _root = path.resolve(__dirname, '../../');

const root = function(...args) {
	return path.join.apply(path, [_root].concat(args));
};

export default root;
