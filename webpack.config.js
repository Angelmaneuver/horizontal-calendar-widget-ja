const path = require('path');

module.exports = {
    entry: {
        index: './src'
    },
    output: {
      path:          path.join(__dirname, 'hcal.widget', 'lib'),
      filename:      'holiday.bundle.js',
      library:       'holiday',
      libraryTarget: 'umd'
    }
};
