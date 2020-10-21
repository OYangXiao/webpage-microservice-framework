const devPresets = ['@vue/babel-preset-app'];
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript', '@vue/babel-preset-jsx'];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
