module.exports = {
  verbose: false,
  plugins: {
    local: {
      browsers: ['chrome']
    },
    istanbul: {
      dir: '../../.output/wct-coverage',
      reporters: ['lcov'],
      include: [
        '/*/*.html',
      ],
      exclude: [
        '/webcomponentsjs/*',
        '/web-component-tester/*'
      ]
    }
  }
};
