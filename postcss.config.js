module.exports = {
  plugins: [
    ['postcss-preset-env', {}],
    ['postcss-nested', { preserveEmpty: true }],
    ['autoprefixer', { grid: true }],
    ['postcss-advanced-variables', {}],
  ],
};
