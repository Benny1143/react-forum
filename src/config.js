const config = {
  head: {
    defaultTitle: "FREE PSLE 'N' 'O' 'A' level notes, exam papers etc!",
    titleTemplate: 'SmartGuppy | %s',
    meta: [
      {
        name: 'description',
        content:
          'We aim to provide the widest array of free educational resources such as notes, worksheets, exam papers etc',
      },
      { charset: 'utf-8' },
      { property: 'og:site_name', content: 'SmartGuppy' },
      { property: 'og:image', content: 'https://www.smartguppy.com/logo.png' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'SmartGuppy' },
      {
        property: 'og:description',
        content:
          'We aim to provide the widest array of free educational resources such as notes, worksheets, exam papers etc',
      },
      { property: 'og:card', content: 'summary' },
      { property: 'og:site', content: '@ericluwj' },
      { property: 'og:creator', content: '@ericluwj' },
      { property: 'og:image:width', content: '200' },
      { property: 'og:image:height', content: '200' },
    ],
  },
};

module.exports = config;
