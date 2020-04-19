<template>
  <section id="projects">
    <div class="projects__container">

      <Slider class="slider--shadow"
        :listOfContent="logos" 
        totalWidth="200px"
        totalHeight="80px"
        contentWidth="50px"
        @contentChange="changeSelectedProject" />

      <div class="projects__info">
        <div class="projects__header">
          <figure class="projects__picture" @click="openPopup">
            <img :src="selectedProject.pics[0]" alt="">
          </figure>
          <div>
            <h2 class="projects__title">{{selectedProject.name}}</h2>
            <h4 class="projects__description">{{selectedProject.description}}</h4>
            <div class="projects__links">
              <a :href="selectedProject.link" target="_blank" class="projects__link">Website</a>
              <a :href="selectedProject.github" target="_blank" class="projects__link">Github</a>
            </div>
          </div>
        </div>
        <p class="projects__details" 
          v-for="(paragraph, index) in selectedProject.text" :key="index">
          {{paragraph}}
        </p>
        <div class="projects__details projects__details--extra-margin">
          <ul v-if="selectedProject.technicalInfo.backend">
            <span>Backend ({{selectedProject.technicalInfo.backend.tech}}):</span>
            <li>Infrastructure: {{selectedProject.technicalInfo.backend.infrastructure}}</li>
            <li>Database: {{selectedProject.technicalInfo.backend.database}}</li>
            <li>Major Modules: {{selectedProject.technicalInfo.backend.modules}}</li>
          </ul>
          <ul v-if="selectedProject.technicalInfo.frontend">
            <span>Frontend ({{selectedProject.technicalInfo.frontend.tech}}):</span>
            <li>Infrastructure: {{selectedProject.technicalInfo.frontend.infrastructure}}</li>
            <li>Major Modules: {{selectedProject.technicalInfo.frontend.modules}}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <PopupBox v-if="showPopup" @close="closePopup">
      <Slider :listOfContent="selectedProject.pics"
        :transitionDuration="800"
        contentWidth="80vw"
        @contentChange="updateCurrentImg"
      />

      <span>{{this.currentImg + 1}} / {{this.selectedProject.pics.length}}</span>
      <div class="close-btn" @click="closePopup">close X</div>
    </PopupBox>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '../util/Slider'
import PopupBox from '../util/PopupBox'

export default {
  name: 'Project',
  components: { Slider, PopupBox },
  data: function() {
    return {
      selectedIndex: 0,
      currentImg: 0,
      showPopup: false,
      isSliding: false,
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects
    }),
    selectedProject() {
      return this.projects[this.selectedIndex]
    },
    logos() {
      return this.projects.map(p => p.logo)
    }
  },
  methods: {
    changeSelectedProject(newIndex) {
      this.refreshInfo(-1, 100, () => this.selectedIndex = newIndex)
    },


    refreshInfo(signal, startPos, callback) {
      const duration = startPos ? 400 : 600;
      let start = 0;

      const vm = this
      function slide(timestamp) {
        if(!start) start = timestamp
        const pos = startPos + signal*100*(timestamp - start)/duration
        if(signal*pos <= signal*startPos + 100) {
          document.getElementsByClassName('projects__info')[0].style.opacity = `${pos/100}`
          requestAnimationFrame(slide)
        } else if(callback) {
          callback()
          setTimeout(() => vm.refreshInfo(-1*signal, 0), 0)
        }
      }

      requestAnimationFrame(slide)
    },


    updateCurrentImg(newIndex) {
      this.currentImg = newIndex
    },


    openPopup() {
      this.showPopup = true
      window.addEventListener('keydown', this.checkInput)
    },


    closePopup() {
      this.showPopup = false
      this.currentImg = 0;
      window.removeEventListener('keydown', this.checkInput)
    },


    checkInput(e) {
      if(e.key === 'Escape') {
        this.closePopup()
      } else if(e.key === 'ArrowLeft') {
        this.slideImg('previous')
      } else if(e.key === 'ArrowRight') {
        this.slideImg('next')
      }
    }
  }
}
</script>

<style>
#projects {
  display: flex;
  justify-content: center;
  padding: 70px 50px 50px 0;
  background-color: rgba(253, 253, 253, 0.6);
}

.projects__container {
  width: 980px;
  display: flex;
}

/* Info
================== */

.projects__info {
  position: relative;
  z-index: 2;
  padding-top: 50px;
  padding-left: 70px;
  text-align: left;
}

.projects__title {
  font-family: 'Baloo 2';
  font-size: 40px;
  opacity: 0.8;
  margin-bottom: 15px;
}

.projects__description {
  font-family: 'B612 Mono';
  font-size: 16px;
  letter-spacing: -1px;
  opacity: 0.7;
}

.projects__links {
  margin-top: 30px;
  margin-bottom: 50px;
}

#projects .projects__link {
  padding: 10px 30px;
  background-color: rgb(185, 215, 233);
  border-radius: 4px;
  color: #fff;
  transition: background 0.6s;
}

.projects__link + .projects__link {
  margin-left: 20px;
}

#projects .projects__link:hover {
  background-color: rgb(142, 176, 197);
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

.projects__picture {
  position: relative;
  float: right;
  height: 150px;
  width: 200px;
  overflow: hidden;
  cursor: zoom-in;
  padding: 5px 0;
  display: flex;
  align-items: flex-start;
}

.projects__picture::after {
  content: '';
  position: absolute;
  height: 150px;
  width: 200px;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 2;
  border-radius: 4px;
  transition: background 0.6s;
}

.projects__picture:hover::after {
  background: rgba(142, 176, 197, 0.5);
}

.projects__picture img {
  position: relative;
  width: 100%;
  min-height: 110px;
  max-height: 140px;
  opacity: 0.8;
  z-index: 1;
}

@media(max-width: 1000px) {
  #projects {
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
  #projects {
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

#projects .popup-bg span {
  position: absolute;
  color: #ffffffaa;
  z-index: 100;
  bottom: 0;
  font-family: 'Baloo 2';
}

#projects .popup-bg .close-btn {
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 50px;
  color: #ffffffaa;
  cursor: pointer;
}
</style>