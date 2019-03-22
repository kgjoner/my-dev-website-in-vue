const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
    configureWebpack: {
      plugins: [
        new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: ['/',
            ],
            renderer: new Renderer({
              injectProperty: '__PRERENDER_INJECTED',
              inject: {
                prerendered: true
              },
              maxConcurrentRoutes: 4,
              renderAfterElementExists: '.content-ready'
            })
          })
      ]
    }
  }