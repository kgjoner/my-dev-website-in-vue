const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
    configureWebpack: {
      plugins: [
        new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: ['/',
                '/cavaleiro-de-sirius',
                '/anseio-pelas-artes-proibidas',
                '/chamado-do-cacador'
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