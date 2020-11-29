import { homeSections, headerHeight } from "./constants";

export default {
  state: {
    windowWidth: process.isClient ? window.innerWidth : null,
    isHeaderTransparent: true,
    monitorActiveSection: true,
    sections: [],
    activeSection: homeSections.HERO,
    projectsMail: null
  },
  mutations: {
    changeWidth(state) {
      state.windowWidth = window.innerWidth;
    },
    setHeaderTransparency(state, isTransparent) {
      state.isHeaderTransparent = isTransparent
    },
    setMonitorActiveSection(state, isMonitoring) {
      state.monitorActiveSection = isMonitoring
    },
    setSections(state, newSections) {
      state.sections = newSections
    },
    setActiveSection(state, newSection) {
      state.activeSection = newSection
    },
    setProject(state, newProject) {
      state.projectsMail = newProject
    }
  },
  actions: {
    updateHeaderTransparency({ commit }, boolean) {
      commit('setHeaderTransparency', boolean)
    },

    updateMonitorActiveSection({ commit }, boolean) {
      commit('setMonitorActiveSection', boolean)
    },

    updateSections({ commit }, newSections) {
      commit('setSections', newSections)
    },

    updateActiveSection({ commit }, newSection) {
      commit('setActiveSection', newSection)
    },

    updateProjectsMail({ commit }, newProjet) {
      commit('setProject', newProjet)
    },

    clearProjectsMail({ commit }) {
      commit('setProject', null)
    },

    monitorScroll({ state, dispatch }, sectionsElementsLastToFirst) {
      if(window.location.pathname !== '/') {
        if(state.monitorActiveSection) {
          dispatch('checkActiveSection', sectionsElementsLastToFirst)
        }
        if(state.isHeaderTransparent) {
          dispatch('updateHeaderTransparency', false)
        }
      } else {
        if(state.monitorActiveSection && window.scrollY > 50) {
          dispatch('checkActiveSection', sectionsElementsLastToFirst)
        }

        if(window.scrollY > 50 && state.isHeaderTransparent) {
          dispatch('updateHeaderTransparency', false)
          if(state.monitorActiveSection) {
            dispatch('updateActiveSection', homeSections.PROJECTS)
          }
        } else if(window.scrollY <= 50 && !state.isHeaderTransparent) {
          dispatch('updateHeaderTransparency', true)
          dispatch('updateActiveSection', homeSections.HERO)
        }
      }

    },

    checkActiveSection({ state, dispatch }, sectionsElementsLastToFirst) {
      if(!sectionsElementsLastToFirst.length) return

      let currentActiveSection = null
      sectionsElementsLastToFirst.some(el => {
        if(el.offsetTop <= (window.scrollY + headerHeight + 50)) {
          currentActiveSection = el.id
          return true
        }
      })

      if(currentActiveSection !== state.activeSection) {
        const correctedActiveSection = currentActiveSection || state.sections[0].anchor.slice(1)
        dispatch('updateActiveSection', correctedActiveSection)
      }
    },

    scrollPage({ dispatch }, { destination, offset, duration }) {
      dispatch('updateActiveSection', destination)
      dispatch('updateMonitorActiveSection', false)
      const destinationEl = document.getElementById(destination)

      const isTabUser = document.querySelector('.tab-user')
      const firstFocusableElement = destinationEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')

			let start = window.pageYOffset;
			const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
			const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			const destinationOffset = destinationEl.offsetTop;
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
            if(isTabUser && firstFocusableElement) firstFocusableElement.focus()
					}
				} else {
					window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
					if((Math.ceil(window.scrollY) > (destinationOffsetToScroll - offset)) &&
						window.scrollY !== 0) {
						window.requestAnimationFrame(scroll);
					} else {
            dispatch('updateMonitorActiveSection', true)
            if(isTabUser && firstFocusableElement) firstFocusableElement.focus()
					}
				}
			}
			window.requestAnimationFrame(scroll)
    },

  }
}
