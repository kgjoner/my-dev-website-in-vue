import Vue from 'vue'
import Vuex from 'vuex'

import ficcionados from './assets/img/ficcionados.svg'
import ficcionadosPic1 from './assets/img/ficcionados_1.jpg'
import ficcionadosPic2 from './assets/img/ficcionados_2.jpg'
import ficcionadosPic3 from './assets/img/ficcionados_3.jpg'
import ficcionadosPic4 from './assets/img/ficcionados_4.jpg'
import ficcionadosPic5 from './assets/img/ficcionados_5.jpg'


import freeflow from './assets/img/freeflow.svg'
import freeflowPic1 from './assets/img/freeflow_1.jpg'
import freeflowPic2 from './assets/img/freeflow_2.jpg'
import freeflowPic3 from './assets/img/freeflow_3.jpg'
import freeflowPic4 from './assets/img/freeflow_4.jpg'
import freeflowPic5 from './assets/img/freeflow_5.jpg'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    headerHeight: 60,
    isHeaderTransparent: true,
    monitorActiveSection: true,
    sections: [
      'cover',
      'presentation',
      'projects',
      'contact'
    ],
    activeSection: 'cover',
    projects: [
      {
        name: 'Ficcionados',
        logo: ficcionados,
        description: 'A blog about fiction writing.',
        link: 'https://www.ficcionados.com.br/',
        github: 'https://github.com/kgjoner/ficcionados',
        text: [
          'As a common blog, it displays recent posts and allows users search for old ones either by a query tool or navigating by a tree of categories.',
          'On an admin end, the blog writers have access to a panel to add posts, manage categories, and upload images; similar to the basic tools found in Wordpress.',
          'It is a single page application, so the routes were prerendered to help SEO.'
        ],
        technicalInfo: {
          backend: {
            tech: 'Node.js',
            infrastructure: 'Heroku, Cloudinary.', 
            database: 'Postgres, Mongodb.', 
            modules: 'Express, Knex and Mongoose.'
          },
          frontend: {
            tech: 'Vue',
            infrastructure: 'Netlify.',
            modules: 'Vuex, Vue-router, Bootstrap-vue and Prerender-spa-plugin.'
          }
        },
        pics: [ficcionadosPic1, ficcionadosPic2, ficcionadosPic3, ficcionadosPic4, ficcionadosPic5]
      },
      {
        name: 'Freeflow',
        logo: freeflow,
        description: 'An online app to build flowcharts.',
        link: 'https://freeflowchart.netlify.com/',
        github: 'https://github.com/kgjoner/freflow',
        text: [
          'It is a drag and drop app, where the user can select a shape, resize it, type inside it, or change its properties like color and border.',
          // 'The elements are fully reactive. When the user drags a shape already linked to others, the arrows between them will respond accordingly.',
          'The state is constantly saved in local storage, so if the user closes the browser, when they come back their work will not be lost.',
          'It began as a personal project to explore dynamic components, data flow and scalability, and it still lacks responsiveness.'
        ],
        technicalInfo: {
          frontend: {
            tech: 'Vue',
            infrastructure: 'Netlify.',
            modules: 'Nuxt.'
          }
        },
        pics: [freeflowPic1, freeflowPic2, freeflowPic3, freeflowPic4, freeflowPic5]
      }
    ]
  },
  mutations: {
    changeWidth() {
      this.state.windowWidth = window.innerWidth;
    },
    setHeaderTransparency(state, isTransparent) {
      state.isHeaderTransparent = isTransparent
    },
    setMonitorActiveSection(state, isMonitoring) {
      state.monitorActiveSection = isMonitoring
    },
    setSection(state, newSection) {
      state.activeSection = newSection
    },
  },
  actions: {
    updateHeaderTransparency({ commit }, boolean) {
      commit('setHeaderTransparency', boolean)
    },

    updateMonitorActiveSection({ commit }, boolean) {
      commit('setMonitorActiveSection', boolean)
    },

    updateActiveSection({ commit }, newSection) {
      commit('setSection', newSection)
    },

    monitorScroll({ state, dispatch }, sectionsElementsLastToFirst) {
      if(state.monitorActiveSection && window.scrollY > 50) {
				dispatch('checkActiveSection', sectionsElementsLastToFirst)
			}
			if(window.scrollY > 50 && state.isHeaderTransparent) {
				dispatch('updateHeaderTransparency', false)
				if(state.monitorActiveSection) {
					dispatch('updateActiveSection', 'presentation')
				}
			} else if(window.scrollY <= 50 && !state.isHeaderTransparent) {
				dispatch('updateHeaderTransparency', true)
				dispatch('updateActiveSection', 'cover')
			}
    },

    checkActiveSection({ state, dispatch }, sectionsElementsLastToFirst) {
      let currentActiveSection = null
      sectionsElementsLastToFirst.some(el => {
        if(el.offsetTop <= (window.scrollY + state.headerHeight + 50)) {
          currentActiveSection = el.id
          return true
        }
      })

      if(currentActiveSection !== state.activeSection) {
        const correctedActiveSection = currentActiveSection == "cover" ? 
          "presentation" : currentActiveSection
        dispatch('updateActiveSection', correctedActiveSection)
      }
    },

    scrollPage({ dispatch }, { destination, offset, duration }) {
      dispatch('updateActiveSection', destination.id)
      dispatch('updateMonitorActiveSection', false)

			let start = window.pageYOffset;
			const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
			const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			const destinationOffset = destination.offsetTop;
			let destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
			function scroll() {
				const now = 'now' in window.performance ? performance.now() : new Date().getTime();
				const time = Math.min(1, ((now - startTime) / duration));
				if(destinationOffsetToScroll > start) {
					window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
					if(Math.ceil(window.scrollY) < (destinationOffsetToScroll - offset)) {
						window.requestAnimationFrame(scroll);
					} else {
            dispatch('updateMonitorActiveSection', true)
					}
				} else {
					window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
					if((Math.ceil(window.scrollY) > (destinationOffsetToScroll - offset)) &&
						window.scrollY !== 0) {
						window.requestAnimationFrame(scroll);
					} else {
            dispatch('updateMonitorActiveSection', true)
					}
				}
			}
			window.requestAnimationFrame(scroll)
    },

  }
})
