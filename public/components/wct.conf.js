module.exports = {
  verbose: false,
  plugins: {
    local: {
      browsers: ['chrome']
    },
    // istanbul: {
    //   dir: "./coverage",
    //   reporters: ["text-summary", "lcov"],
    //   include: [
    //     "*.html"
    //   ],
    //   exclude: [
    //     "../bower_components/polymer/polymer.js",
    //     "../bower_components/platform/platform.js"
    //   ]
    // }
  }
};
