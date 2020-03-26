<template>
  <div id="projects">
    <div class="project-selector">
      <div class="logos-box">
        <div class="logo-retainer">
          <ul class="logos-list">
            <li v-for="(logo, index) in currentLogos" :key="index">
              <img :src="logo" alt="" :class="{'ficcionados': logo === projects[0].logo}">
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-wrap">
        <button @click="previousProject">
          <div class="icon arrow-left"></div>
        </button>
        <button @click="nextProject">
          <div class="icon arrow-right"></div>
        </button>
      </div>
    </div>
    <div class="project-info">
      <div class="info-carrier">
        <div class="picture-box" @click="openPopup">
          <img :src="selectedProject.pics[0]" alt="">
        </div>
        <h2>{{selectedProject.name}}</h2>
        <h4>{{selectedProject.description}}</h4>
        <div class="flex-wrap">
          <a :href="selectedProject.link" target="_blank" class="website-btn">Website</a>
          <a :href="selectedProject.github" target="_blank" class="github-btn">Github</a>
        </div>
        <p v-for="(paragraph, index) in selectedProject.text" :key="index">{{paragraph}}</p>
        <div class="technical-details">
          <ul v-if="selectedProject.technicalInfo.backend" class="backend-info">
            <span>Backend ({{selectedProject.technicalInfo.backend.tech}}):</span>
            <li>Infrastructure: {{selectedProject.technicalInfo.backend.infrastructure}}</li>
            <li>Database: {{selectedProject.technicalInfo.backend.database}}</li>
            <li>Major Modules: {{selectedProject.technicalInfo.backend.modules}}</li>
          </ul>
          <ul v-if="selectedProject.technicalInfo.frontend" class="frontend-info">
            <span>Frontend ({{selectedProject.technicalInfo.frontend.tech}}):</span>
            <li>Infrastructure: {{selectedProject.technicalInfo.frontend.infrastructure}}</li>
            <li>Major Modules: {{selectedProject.technicalInfo.frontend.modules}}</li>
          </ul>
        </div>
      </div>
    </div>
    <PopupBox v-show="showPopup" @close="closePopup">
      <div class="imgs-slide">
        <button @click="slideImg('previous')">
          <div class="icon arrow-left"></div>
        </button>
        <div class="img-retainer">
          <div class="img-carrier">
            <div class="img-box" v-for="(pic, index) in selectedProject.pics" :key="index">
              <img :src="pic" alt="">
            </div>
          </div>
        </div>
        <button @click="slideImg('next')">
          <div class="icon arrow-right"></div>
        </button>
        <span>{{this.currentImg + 1}} / {{this.selectedProject.pics.length}}</span>
        <div class="close-btn" @click="closePopup">close X</div>
      </div>
    </PopupBox>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PopupBox from '../util/PopupBox'

export default {
  name: 'Project',
  components: { PopupBox },
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
    nextIndex() {
      let nextIndex = this.selectedIndex + 1
      if(nextIndex > this.projects.length - 1) nextIndex = 0
      return nextIndex
    },
    previousIndex() {
      let previousIndex = this.selectedIndex - 1
      if(previousIndex < 0) previousIndex = this.projects.length - 1
      return previousIndex
    },
    currentLogos() {
      const adjacentIndexes = [
        this.previousIndex,
        this.selectedIndex,
        this.nextIndex
      ]
      return adjacentIndexes.map(i => this.projects[i].logo)
    },
  },
  methods: {
    nextProject() {
      this.slideProject(-1, 100, () => this.selectedIndex = this.nextIndex)
      this.slideLogo(-1)
    },


    previousProject() {
      this.slideProject(-1, 100, () => this.selectedIndex = this.previousIndex)
      this.slideLogo(1)
    },


    slideProject(signal, startPos, callback) {
      const duration = startPos ? 400 : 600;
      let start = 0;

      const vm = this
      function slide(timestamp) {
        if(!start) start = timestamp
        const pos = startPos + signal*100*(timestamp - start)/duration
        if(signal*pos <= signal*startPos + 100) {
          document.getElementsByClassName('info-carrier')[0].style.opacity = `${pos/100}`
          requestAnimationFrame(slide)
        } else if(callback) {
          callback()
          setTimeout(() => vm.slideProject(-1*signal, 0), 0)
        } else {
          document.getElementsByClassName('project-info')[0].classList.remove('sliding')
        }
      }

      requestAnimationFrame(slide)
    },

    slideLogo(signal) {
      const duration = 400;
      let start = 0;

      function slide(timestamp) {
        if(!start) start = timestamp
        const pos = 90*(timestamp - start)/duration
        if(pos <= 90) {
          document.getElementsByClassName('logos-list')[0].style.left = `${signal*pos}px`
          requestAnimationFrame(slide)
        } else {
          document.getElementsByClassName('logos-list')[0].style.left = `0px`
        }
      }

      requestAnimationFrame(slide)
    },


    slideImg(direction) {
      if(this.isSliding) return
      this.isSliding = true
      let signal = direction === 'next' ? 1 : -1
      const preload = 100*this.currentImg + 10
      const duration = 800
      let pos = 0
      let startTime = 0
      let multiplier = 1

      if(this.currentImg == 0 && direction == 'previous' ||
        this.currentImg == this.selectedProject.pics.length - 1 && direction == 'next') {
        //It needs to change the informed direction and pass by all images, either returning
        //to the first one (next to the last) or going to the last one (previous to the first).
        signal = (-1)*signal
        multiplier = this.selectedProject.pics.length - 1
      }

      const vm = this
      function slide(timestamp) {
        if(!startTime) startTime = timestamp;
        pos = signal*multiplier*100*(timestamp - startTime)/duration + preload
        if(signal*pos <= multiplier*100 + signal*preload) {
          document.getElementsByClassName('img-carrier')[0].style.left = `-${Math.ceil(pos)}vw`
          requestAnimationFrame(slide)
        } else {
          vm.currentImg = vm.currentImg + signal*multiplier
          vm.isSliding = false
        }
      }
      requestAnimationFrame(slide)
    },


    openPopup() {
      this.showPopup = true
      window.addEventListener('keydown', this.checkInput)
    },


    closePopup() {
      this.showPopup = false
      this.currentImg = 0;
      document.getElementsByClassName('img-carrier')[0].style.left = `-10vw`
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
  padding: 70px 20px 50px 80px;
  background-color: rgba(253, 253, 253, 0.6);
}

#projects .project-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

#projects .project-selector button {
  height: 30px;
  width: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 2px solid rgb(185, 215, 233);
  outline: none;
  padding: 0;
  transform: scale(1.2);
  opacity: 0.8;
  transition: 0.5s;
}

#projects .project-selector button:hover {
  border-color: var(--main-color);
}

#projects .icon {
  mask-image: url('../../assets/img/arrow.svg');
  background-color: rgb(185, 215, 233);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: 50% 50%;
  height: 27px;
  width: 27px;
  transition: 0.5s;
}

#projects .project-selector button:hover .icon {
  background-color: var(--main-color);
}

#projects .arrow-left {
  transform: rotate(90deg);
}

#projects .arrow-right {
  transform: rotate(-90deg);
}

#projects .logos-box {
  height: 80px;
  width: 200px;
  margin: 40px 0;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: rgba(253, 253, 253, 0.6);
  box-shadow: 0 40px 40px 5px rgb(185, 215, 233);
}

#projects .project-selector::after {
  content: '';
  position: absolute;
  top: 40px;
  left: -40%;
  width: 180%;
  height: 100px;
  background: rgba(254, 254, 254, 1);
}

#projects .logos-box .logo-retainer {
  overflow: hidden;
  width: 100px;
  display: flex;
  justify-content: center;
}

#projects .logos-box .logos-list {
  position: relative;
  top: 0px;
  padding: 0;
  margin: 0;
  z-index: 2;
  background: rgba(253, 253, 253, 0.6);
  display: flex;
  justify-content: space-between;
}

#projects .logos-list li {
  margin: 20px 20px;
  width: 50px;
  list-style: none;
}

#projects img.ficcionados {
  background-color: #1d7fd8;
  border-radius: 5px;
}

#projects .flex-wrap {
  margin-top: 30px;
  margin-bottom: 50px;
}

#projects .project-selector .flex-wrap {
  position: absolute;
  top: 40px;
  z-index: 3;
  width: 180px;
  display: flex;
  justify-content: space-between;
}

#projects .project-info {
  position: relative;
  z-index: 2;
  padding-top: 50px;
  padding-left: 70px;
  text-align: left;
}

#projects .project-info.sliding {
  overflow: hidden;
  width: 45rem;
}

#projects .sliding.right {
  mask-image: linear-gradient(to right, black 50%, transparent 100%);
}

#projects .sliding.left {
  mask-image: linear-gradient(to left, black 20%, transparent 100%);
}

#projects .project-info .info-carrier {
  position: relative;
}

#projects .project-info h2 {
  font-family: 'Baloo 2';
  font-size: 40px;
  opacity: 0.8;
  margin-bottom: 15px;
}

#projects .project-info h4 {
  font-family: 'B612 Mono';
  font-size: 16px;
  letter-spacing: -1px;
  opacity: 0.7;
}

#projects .project-info a {
  padding: 10px 30px;
  background-color: rgb(185, 215, 233);
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  transition: background 0.6s;
}

#projects .project-info a + a {
  margin-left: 20px;
}

#projects .project-info a:hover {
  background-color: rgb(142, 176, 197);
}

#projects .project-info p,
#projects .technical-details {
  font-family: 'Baloo 2';
  font-size: 1.25rem;
  max-width: 45rem;
  line-height: 150%;
  letter-spacing: 0.8px;
  opacity: 0.8;
  margin-bottom: 24px;
}

#projects .technical-details {
  margin-top: 30px;
}

#projects .technical-details ul span {
  position: relative;
  top: 0px;
  left: -40px;
  line-height: 300%;
  margin-top: 40px;
  font-weight: bold;
}

#projects .technical-details li {
  line-height: 200%;
}

#projects .picture-box {
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

#projects .picture-box::after {
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

#projects .picture-box:hover::after {
  background: rgba(142, 176, 197, 0.5);
}

#projects .picture-box img {
  position: relative;
  width: 100%;
  min-height: 110px;
  max-height: 140px;
  opacity: 0.8;
  z-index: 1;
}

#projects .imgs-slide {
  height: 80vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#projects .imgs-slide .img-retainer {
  height: 90vh;
  width: 80vw;
  overflow: hidden;
}

#projects .imgs-slide .img-carrier {
  position: relative;
  left: -10vw;
  display: grid;
  grid-template-columns: repeat(5, 100vw);
}

#projects .img-retainer .img-box {
  height: 90vh;
  /* width: 100vw; */
  display: flex;
  align-items: center;
  justify-content: center;
}

#projects .img-retainer img {
  max-height: 90vh;
  max-width: 80vw;
}

#projects .imgs-slide span {
  position: absolute;
  color: #ffffffaa;
  z-index: 100;
  bottom: 0;
  font-family: 'Baloo 2';
}

#projects .imgs-slide .close-btn {
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 50px;
  color: #ffffffaa;
  cursor: pointer;
}
</style>