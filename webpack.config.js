const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact({
    content: [
      './pages/**/*.{html,js}',
      './components/**/*.{html,js}'
    ],
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      sourceMap: true,
    },
    // Uncomment this line if you don't want to use SVGR
    // See: https://react-svgr.com/
    // svgr: false
  }),
  (config) => {
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return config;
  }
);
