import commonjs from 'rollup-plugin-commonjs'
import html from 'rollup-plugin-html'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
	entry: 'src/index.js',
	dest: 'public/js/bundle.js',
	format: 'iife',
	sourceMap: true,
	plugins: [
		html({
			include: 'index.html'
		}),
		nodeResolve({
			jsnext: true
		}),
		commonjs()
	]
}
