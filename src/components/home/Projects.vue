<template>
  <section class="projects" :id="sections.PROJECTS">
    <div class="app__container">
      <IndexController 
        :contentLength="projects.length"
        :selectedIndex="selectedIndex"
        :shouldListen="isActive"
        @indexChange="changeSelectedProject"
      />

      <div class="projects__container"
        :class="{ 'slow-blink': isChanging}">
        <div class="projects__header">
          <div class="projects__title">
            <figure class="projects__logo">
              <img :src="selectedProject.logo" alt="logo"
                :class="{
                  'slow-blink': isChanging,
                  'ficcionados': selectedProject === projects[0]
                }">
            </figure>
            <h3 class="projects__name">
              {{selectedProject.name}}
            </h3>
          </div>
          <p class="projects__description">
            {{selectedProject.description}}
          </p>
          <div class="projects__links">
            <a v-if="selectedProject.link"
              class="projects__link"
              :href="selectedProject.link" 
              target="_blank">
              Website
            </a>
            <a v-if="selectedProject.github"
              class="projects__link"
              :href="selectedProject.github" 
              target="_blank">
              Github
            </a>
          </div>
          <figure class="projects__picture">
            <img :src="selectedProject.presentation" 
              :alt="`${selectedProject.name} presentation`"
              :class="{ 'slow-blink': isChanging}">
          </figure>
        </div>

        <div class="projects__info">
          <p class="projects__details" 
            v-for="(paragraph, index) in selectedProject.text" :key="index">
            {{paragraph}}
          </p>
          <div class="projects__details projects__details--extra-margin">
            <ul v-if="selectedProject.technicalInfo.backend">
              <span>Backend ({{selectedProject.technicalInfo.backend.tech}}):</span>
              <li v-show="selectedProject.technicalInfo.backend.infrastructure">
                Infrastructure: {{selectedProject.technicalInfo.backend.infrastructure}}</li>
              <li>Database: {{selectedProject.technicalInfo.backend.database}}</li>
              <li>Major Modules: {{selectedProject.technicalInfo.backend.modules}}</li>
            </ul>
            <ul v-if="selectedProject.technicalInfo.frontend">
              <span>Frontend ({{selectedProject.technicalInfo.frontend.tech}}):</span>
              <li v-show="selectedProject.technicalInfo.frontend.infrastructure">
                Infrastructure: {{selectedProject.technicalInfo.frontend.infrastructure}}</li>
              <li>Major Modules: {{selectedProject.technicalInfo.frontend.modules}}</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { sections, root } from '../../constants'
import projects from '../../data/projects'
import IndexController from '../util/IndexController'

export default {
  name: 'Project',
  components: { IndexController },
  data: function() {
    return {
      selectedIndex: 0,
      isChanging: false,
      isActive: false,
      projects,
      sections,
      root
    }
  },
  computed: {
    ...mapState({
      projectsMail: state => state.projectsMail,
      activeSection: state => state.activeSection
    }),
    selectedProject() {
      return this.projects[this.selectedIndex]
    },
  },
  methods: {
    changeSelectedProject(newIndex) {
      const mainColor = this.projects[newIndex].mainColor
      const mainRGB = this.hexToRgb(mainColor)
      this.isChanging = true

      setTimeout(() => {
        document.documentElement.style.setProperty('--project-color', mainColor)
        document.documentElement.style.setProperty('--project-rgb', mainRGB)
        document.documentElement.style.setProperty('--main-color', mainColor)
        document.documentElement.style.setProperty('--main-rgb', mainRGB)
        document.documentElement.style.setProperty('--mask-logo', `url('../../assets/img/${this.projects[newIndex].name.toLowerCase()}.svg')`);
        this.selectedIndex = newIndex
      }, 120)

      setTimeout(() => this.isChanging = false, 600)
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    }

  },
  watch: {
    projectsMail(projectName) {
      this.projects.forEach((project, index) => {
        if(project.name.toLowerCase() === projectName.toLowerCase()) {
          this.changeSelectedProject(index)
        }
      })
    },
    activeSection(newSection, oldSection) {
      if(newSection === sections.PROJECTS) {
        document.documentElement.style.setProperty('--main-color', this.selectedProject.mainColor)
        document.documentElement.style.setProperty('--main-rgb', this.hexToRgb(this.selectedProject.mainColor))
        this.isActive = true
      } else if (oldSection === sections.PROJECTS) {
        document.documentElement.style.setProperty('--main-color', this.root.MAIN_COLOR)
        document.documentElement.style.setProperty('--main-rgb', this.root.MAIN_RGB)
        this.isActive = false
      }
    }
  }
}
</script>

<style>
:root {
  --mask-logo: url('../../assets/img/ficcionados.svg');
  --project-color: var(--main-color);
  --project-rgb: var(--main-rgb);
}

.projects {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 0 50px 0;
  background: linear-gradient(to bottom, #d8d8d8, #fff);
  position: relative;
  overflow: hidden;
}

.projects::after {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at -30% 80%, var(--project-color), var(--project-color) 30%, transparent 50%);
  opacity: 0.3;
}

.projects__container {
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
}

/* Header
================== */

.projects__header {
  width: 38%;
  padding-left: 80px;
  z-index: 2;
}

.projects__title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.projects__logo {
  opacity: 0.7;
  position: absolute;
  width: 70px;
  height: 70px;
  top: -20px;
  left: -70px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(45deg);
}

.projects__logo img {
  width: 100%;
}

.projects__title::after {
  content: '';
  position: absolute;
  background: linear-gradient(to top, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 40%, transparent 100%) ;
  /* background-color: #000; */
  height: 70px;
  width: 70px;
  bottom: -45px;
  left: -45px;
  mask-image: var(--mask-logo);
  mask-size: contain;
  mask-position: bottom center;
  mask-repeat: no-repeat;
  transform: scaleX(-1) scaleY(0.5773) rotate(-135deg);
}

.projects__name {
  font-family: 'Baloo 2';
  font-size: 40px;
  opacity: 0.8;
  margin-bottom: 0;
}

.projects__description {
  font-family: 'B612 Mono';
  font-size: 16px;
  letter-spacing: -1px;
  opacity: 0.7;
  text-align: left;
}

.projects__links {
  margin-top: 30px;
  margin-bottom: 50px;
  display:flex;
}

.projects .projects__link {
  padding: 10px 30px;
  background-color: rgba(var(--project-rgb), 0.6);
  border-radius: 4px;
  color: #fff;
  transition: background 0.6s;
}

.projects__link + .projects__link {
  margin-left: 20px;
}

.projects .projects__link:hover {
  background-color: rgba(var(--project-rgb), 1);
}

.projects__picture {
  position: relative;
  width: 500px;
  top: 40px;
  left: -80px;
}

.projects__picture img {
  position: relative;
  width: 100%;
  opacity: 0.8;
  z-index: 1;
}

.projects__container.slow-blink {
  animation: slow-blink 0.6s;
}

@keyframes slow-blink {
  0%{  }
  15%{ opacity: 0 }
  50%{ opacity: 0 }
  100%{ opacity: 1 }
}


/* Info
================== */

.projects__info {
  position: relative;
  z-index: 2;
  padding-left: 70px;
  text-align: left;
  width: 62%;
}

.projects__details {
  font-family: 'Baloo 2';
  font-size: 1.25rem;
  max-width: 45rem;
  line-height: 150%;
  letter-spacing: 0.8px;
  opacity: 0.8;
  margin-bottom: 24px;
}

.projects__details--extra-margin {
  margin-top: 30px;
}

.projects__details ul span {
  position: relative;
  top: 0px;
  left: -40px;
  line-height: 300%;
  margin-top: 40px;
  font-weight: bold;
}

.projects__details li {
  line-height: 200%;
}

@media(max-width: 1000px) {
  .projects {
    padding: 70px 0 50px 20px;
  }

  .projects__container {
    flex-direction: column;
    align-items: flex-start;
    width: 780px;
  }

  .projects__info {
    margin-top: 70px;
    padding-left: 0;
  }
}

@media(max-width: 780px) {
  .projects {
    padding: 70px 40px 50px 40px;
  }

  .projects__container {
    width: 100%;
  }

  .projects__header {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 50px;
  }
}


/* Popup
================== */

.projects .popup-bg span {
  position: absolute;
  color: #ffffffaa;
  z-index: 100;
  bottom: 0;
  font-family: 'Baloo 2';
}

.projects .popup-bg .close-btn {
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 50px;
  color: #ffffffaa;
  cursor: pointer;
}
</style>