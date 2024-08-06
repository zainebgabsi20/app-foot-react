module.exports = {
    input: [
      'src/**/*.{js,jsx}',
      // Use ! to filter out files or directories
      '!src/**/*.test.{js,jsx}'
    ],
    output: './locales',
    options: {
      debug: true,
      removeUnusedKeys: true,
      sort: true,
      lngs: ['en', 'es'],
      resource: {
        loadPath: 'locales/{{lng}}/{{ns}}.json',
        savePath: 'locales/{{lng}}/{{ns}}.json'
      },
      defaultValue: '__STRING_NOT_TRANSLATED__',
      keySeparator: false, // use false if your keys are not in dot notation
      nsSeparator: false // use false if your namespaces are not in dot notation
    }
  };
  