<template>
  <section class="projects" :id="homeSections.PROJECTS">
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
              <img src="../../assets/img/logos_sprite.png" alt="logo"
                :class="{'ficcionados': selectedProject === projects[0]}"
                :style="{
                  'top': selectedProject.logo.top + 'px',
                  'left': selectedProject.logo.left + 'px'
                }"
              >
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
              target="_blank"
              rel="noopener">
              Website
            </a>
            <a v-if="selectedProject.github"
              class="projects__link"
              :href="selectedProject.github" 
              target="_blank"
              rel="noopener">
              Github
            </a>
          </div>
          <figure class="projects__picture"
            ref="presentationFigure"
          >
            <img
              :src="windowWidth < 1000 && windowWidth >= 700
                  ? presentationSpriteMob
                  : presentationSprite" 
              :alt="`${selectedProject.name} presentation`"
              :style="{
                'top': presentationPosition.top + 'px',
                'left': presentationPosition.left + 'px'
              }"
            >
          </figure>
        </div>

        <div class="projects__info">
          <p class="projects__details" 
            v-for="(paragraph, index) in selectedProject.text" :key="index">
            {{paragraph}}
          </p>
          <figure v-if="selectedProject.technicalInfo.backend"
            class="projects__details projects__details--extra-margin">
            <figcaption>Backend ({{selectedProject.technicalInfo.backend.tech}}):</figcaption>
            <ul>
              <li v-show="selectedProject.technicalInfo.backend.infrastructure">
                Infrastructure: {{selectedProject.technicalInfo.backend.infrastructure}}</li>
              <li>Database: {{selectedProject.technicalInfo.backend.database}}</li>
              <li>Major Modules: {{selectedProject.technicalInfo.backend.modules}}</li>
            </ul>
          </figure>
          <figure v-if="selectedProject.technicalInfo.frontend"
            class="projects__details">
            <figcaption>Frontend ({{selectedProject.technicalInfo.frontend.tech}}):</figcaption>
            <ul>
              <li v-show="selectedProject.technicalInfo.frontend.infrastructure">
                Infrastructure: {{selectedProject.technicalInfo.frontend.infrastructure}}</li>
              <li>Major Modules: {{selectedProject.technicalInfo.frontend.modules}}</li>
            </ul>
          </figure>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { homeSections, root } from '../../constants'
import projects from '../../data/projects'
import IndexController from '../util/IndexController'

import presentationSprite from '../../assets/img/presentations_sprite.png'
import presentationSpriteMob from '../../assets/img/presentations_sprite-mob.png'

export default {
  name: 'Project',
  components: { IndexController },
  metaInfo: {
    link: [
      ...prefetchImg('logo'),
      ...function() {
        return process.isClient && window.innerWidth < 1000 && window.innerWidth >= 780 
          ? prefetchImg('presentationMob')
          : prefetchImg('presentationReg')
      }()
    ]
  },
  data: function() {
    return {
      selectedIndex: 0,
      isChanging: false,
      isActive: false,
      projects,
      homeSections,
      root,
      presentationSprite,
      presentationSpriteMob
    }
  },
  computed: {
    ...mapState({
      projectsMail: state => state.projectsMail,
      activeSection: state => state.activeSection,
      windowWidth: state => state.windowWidth
    }),
    selectedProject() {
      return this.projects[this.selectedIndex]
    },
    presentationPosition() {
      const scale = this.$refs.presentationFigure 
        ? this.$refs.presentationFigure.getBoundingClientRect().width / 700
        : 1
      return {
        top: this.selectedProject.presentationReg.top * scale,
        left: this.selectedProject.presentationReg.left * scale,
      }
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
        document.documentElement.style.setProperty('--mask-position', 
          `${this.projects[newIndex].logo.left}px ` +
          `${this.projects[newIndex].logo.top}px`
        )
        // document.documentElement.style.setProperty('--mask-logo', `url('../../assets/img/${this.projects[newIndex].name.toLowerCase()}.svg')`);
        this.selectedIndex = newIndex
      }, 120)

      setTimeout(() => this.isChanging = false, 600)
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    },

    changePresentationFigureHeight() {
      const pictureWidth = this.$refs.presentationFigure.getBoundingClientRect().width
      const pictureHeight = pictureWidth * ( 450 / 700 )
      this.$refs.presentationFigure.style.height = `${pictureHeight}px`
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
      if(newSection === homeSections.PROJECTS) {
        document.documentElement.style.setProperty('--main-color', this.selectedProject.mainColor)
        document.documentElement.style.setProperty('--main-rgb', this.hexToRgb(this.selectedProject.mainColor))
        this.isActive = true
      } else if (oldSection === homeSections.PROJECTS) {
        document.documentElement.style.setProperty('--main-color', this.root.MAIN_COLOR)
        document.documentElement.style.setProperty('--main-rgb', this.root.MAIN_RGB)
        this.isActive = false
      }
    },
    windowWidth() {
      this.changePresentationFigureHeight()
    }
  },
  mounted() {
    this.changePresentationFigureHeight()
  },
  destroyed() {
    const mainColor = this.projects[0].mainColor
    const mainRGB = this.hexToRgb(mainColor)
    document.documentElement.style.setProperty('--project-color', mainColor)
    document.documentElement.style.setProperty('--project-rgb', mainRGB)
    document.documentElement.style.setProperty('--main-color', this.root.MAIN_COLOR)
    document.documentElement.style.setProperty('--main-rgb', this.root.MAIN_RGB)
  }
}

function prefetchImg(key) {
  return projects.map(project => ({
    rel: 'prefetch',
    href: project[key]
  }))
}
</script>

<style>
:root {
  --mask-position: 0 0;
  --project-color: var(--main-color);
  --project-rgb: var(--main-rgb);
}

.projects {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 750px;
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
  position: relative;
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
  overflow: hidden;
  border-radius: 5px;
}

.projects__logo img {
  width: 200%;
  position: relative;
}

.projects__title::after {
  content: '';
  position: absolute;
  background: linear-gradient(to top, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 40%, transparent 100%) ;
  height: 70px;
  width: 70px;
  bottom: -45px;
  left: -45px;
  mask-image: url('../../assets/img/logos_sprite.png');
  mask-size: 200%;
  mask-position: var(--mask-position);
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
  position: absolute;
  width: 520px;
  height: 335px;
  top: 240px;
  right: -40px;
  overflow: hidden;
}

.projects__picture img {
  position: relative;
  width: 200%;
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
  margin-top: 0;
  margin-bottom: 24px;
}

.projects__details--extra-margin {
  margin-top: 30px;
}

.projects__details figcaption {
  position: relative;
  top: 0px;
  line-height: 300%;
  margin-top: 40px;
  font-weight: bold;
  margin-top: 0;
}

.projects__details ul {
  margin: 0;
}

.projects__details li {
  line-height: 200%;
}

@media(max-width: 1000px) {
  .projects {
    padding: 80px 0 50px 10px;
  }

  .projects::after {
    background: radial-gradient(ellipse at 90% 700px, var(--project-color), var(--project-color) 30%, transparent 50%);
  }

  .projects__container {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .projects__header,
  .projects__info {
    width: 100%;
    position: static;
  }

  .projects__picture {
    top: 150px;
    right: 40px;
  }

  .projects__info {
    padding-left: 70px;
    padding-right: 50px;
    margin-top: 250px;
  }
}

@media(max-width: 700px) {
  .projects::after {
    background: radial-gradient(ellipse at -30% 850px, var(--project-color), var(--project-color) 40%, transparent 60%);
  }

  .projects__info {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
  }

  .projects__picture {
    position: relative;
    top: auto;
    left: -60px;
    width: 120%;
    max-width: 500px;
  }
}

@media(max-width: 500px) {
  .projects__description,
  .projects__links {
    position: relative;
    left: -50px;
  }

  .projects__picture {
    left: -90px;
    min-width: 320px;
  }
}

@media(max-width: 350px) {
  .projects__header {
    position: relative;
    left: -20px;
  }
}
</style>