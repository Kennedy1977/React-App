const esbuild = require('esbuild');
const jsxPlugin = require('esbuild-plugin-jsx');

esbuild.build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  plugins: [jsxPlugin()],
}).catch(() => process.exit(1));
