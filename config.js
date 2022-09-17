'use strict';

module.exports = function(environment) {
  return {
    blog: {
      title: 'Coder\'s Log',
      description: 'Thoughts, stories and ideas from a coder',
      coverImage: '/images/blog-cover.jpg',
      host: 'https://chris.manson.ie',

      navigation: [{
        label: 'Home',
        route: 'index'
      }]
    },

    'responsive-image': {
      sourceDir: 'images',
      destinationDir: 'responsive-images',
      quality: 80,
      supportedWidths: [2000, 1000, 600, 300],
      removeSourceDir: false,
      justCopy: false,
      extensions: ['jpg', 'jpeg', 'png', 'gif']
    },

    metricsAdapters: [{
      name: 'GoogleAnalytics',
      environments: ['production'],
      config: {
        id: 'UA-39405480-3',
      }
    }]
  };
};

module.exports['ember-cli-build'] = {
  fingerprint: {
    extensions: ['js', 'css', 'map']
  }
}
