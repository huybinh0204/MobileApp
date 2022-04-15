const alias = {
  _assets: './src/assets',
  _components: './src/components',
  _constants: './src/constants',
  _hooks: './src/hooks',
  _localization: './src/localization',
  _navigators: './src/navigators',
  _services: './src/services',
  _store: './src/store',
  _test: './test',
  _utilities: './src/utilities',
};
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['module-resolver', { alias }]],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
