import { sections } from "./constants";

export default {
  state: {
    windowWidth: window.innerWidth,
    headerHeight: 60,
    isHeaderTransparent: true,
    monitorActiveSection: true,
    activeSection: sections.HERO,
    projectsMail: 'Ficcionados'
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
    setSection(state, newSection) {
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

    updateActiveSection({ commit }, newSection) {
      commit('setSection', newSection)
    },

    updateProjectsMail({ commit }, newProjet) {
      commit('setProject', newProjet)
    },

    monitorScroll({ state, dispatch }, sectionsElementsLastToFirst) {
      if(state.monitorActiveSection && window.scrollY > 50) {
				dispatch('checkActiveSection', sectionsElementsLastToFirst)
			}
			if(window.scrollY > 50 && state.isHeaderTransparent) {
				dispatch('updateHeaderTransparency', false)
				if(state.monitorActiveSection) {
					dispatch('updateActiveSection', sections.PROJECTS)
				}
			} else if(window.scrollY <= 50 && !state.isHeaderTransparent) {
				dispatch('updateHeaderTransparency', true)
				dispatch('updateActiveSection', sections.HERO)
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
        const correctedActiveSection = currentActiveSection == sections.HERO ? 
          sections.PROJECTS : currentActiveSection
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
}
