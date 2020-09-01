<template>
  <section class="presentation" :id="sections.TECHS">
    <div class="app__container">
      <h2 class="app__heading">
        Techs
      </h2>
      <div class="presentation__list-of-techs">
        <button v-for="(tech, index) in techs" :key="index"
          class="presentation__tech"
          :class="{'presentation__tech--open': openTech === tech.name || closingTech === tech.name,
            'presentation__tech--closing': closingTech === tech.name}"
          :aria-label="tech.name"
          @click="toggleTech(tech.name)"
        >
          <div class="presentation__tech-name">
            <i :class="`presentation__icon fa ${openTech === tech.name 
                ? 'fa-minus' : 'fa-plus'}`">
            </i>
            <h3 class="presentation__text presentation__text--bigger-line">
              {{tech.name}}
            </h3>
          </div>
          <div v-show="openTech === tech.name || closingTech === tech.name"
            class="presentation__tech-info">
            <p class="presentation__text">
              <i class="fa fa-wrench"></i>
              {{tech.including}}
            </p>
            <p class="presentation__text">
              <a v-for="(project, index) in tech.example.split(', ')" :key="index"
                href=""
                class="presentation__link"
                @click="toProjects(project)">{{project || 'Not in portfolio'}}</a>
            </p>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { sections } from '../../constants'

export default {
  name: "Presentation",
  data: function() {
    return {
      openTech: null,
      closingTech: null,
      techs: [
        {
          name: 'React', 
          including: 'gatsby, redux, react-router, testing-library...',
          example: 'Vegmap'
        }, {
          name: 'Vue', 
          including: 'nuxt, gridsome, vuex, vue-router, vuetify...',
          example: 'Ficcionados, FreeFlow'
        }, {
          name: 'Node', 
          including: 'express, pm2, nodemailer, node-schedule, multer...',
          example: 'Ficcionados, Vegmap'
        }, {
          name: 'MongoDB', 
          including: 'atlas, mongolab, mongoose',
          example: 'Vegmap, Ficcionados',
        }, {
          name: 'Postgres', 
          including: 'knex, heroku integration',
          example: 'Ficcionados',
        }, {
          name: 'Redis',
          including: 'node redis, heroku integration',
          example: 'Vegmap'
        }, {
          name: 'Websocket', 
          including: 'socket.io',
          example: 'Vegmap'
        }, {
          name: 'PWA', 
          including: 'workbox',
          example: 'Vegmap'
        }, {
          name: 'JAMstack',
          including: 'gatsby, gridsome',
          example: 'Ficcionados'
        }, {
          name: 'Automated Tests',
          including: 'jest, cypress',
          example: 'Vegmap'
        }, {
          name: 'Netlify',
          including: 'subdomains, plugins',
          example: 'Ficcionados, FreeFlow, Vegmap'
        }, {
          name: 'Heroku',
          including: 'integrations with postgres, mysql, cloudinary, redis...',
          example: 'Ficcionados, Vegmap'
        },
      ],
      sections
    }
  },
  methods: {
    toggleTech(techName) {
      this.closingTech = this.openTech
      this.openTech = this.openTech === techName ? null : techName
      setTimeout(() => this.closingTech = null, 500)
    },
    toProjects(project) {
      const destination = document.getElementById('projects')
      this.$store.dispatch('scrollPage', { destination, offset: 0, duration: 500 })
      setTimeout(() => {
        this.$store.dispatch('updateProjectsMail', project)
      }, 150)
    }
  }
}
</script>

<style>
.presentation {
  padding: 100px 0;
  background: linear-gradient(to bottom, #c9c9c9, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.presentation__list-of-techs {
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
}

.presentation__tech {
  width: calc(50% - 10px);
  background: transparent;
  max-height: 50px;
  margin-bottom: 10px;
  padding: 0 10px;
  background-color: #f2f2f2;
  border: 2px solid rgba(0,0,0,0.1);
  /* box-shadow: 0 0 2px rgba(0,0,0,0.1); */
  /* border: 1px solid rgba(var(--main-rgb), 0.6); */
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  user-select: none;
}

.presentation__tech--open {
  max-height: none;
  animation: open 1s;
}

.presentation__tech--closing {
  animation: close 0.5s;
}

@keyframes open {
  0%{ max-height: 50px; }
  100% { max-height: 150px; }
}

@keyframes close {
  0% { max-height: 150px; }
  100%{ max-height: 50px; }
}

.presentation__tech:hover,
.presentation__tech--open {
  border: 2px solid rgba(var(--main-rgb), 0.6);
  /* background-color: rgba(var(--main-rgb), 0.8); */
}

.presentation__tech:hover *,
.presentation__tech--open * {
  /* color: #fff; */
}

.presentation__tech i {
  color: var(--main-color);
}

body:NOT(.tab-user) .presentation__tech:focus {
  outline: none;
}

.presentation__tech-name {
  display: flex;
  align-items: center;
}

.presentation__icon {
  margin-right: 10px;
  font-size: 0.8em;
  color: var(--main-color);
  transition: 0.2s ease-in-out;
}

.presentation__text {
  width: 100%;
  font-family: 'Baloo 2';
  color: rgba(0,0,0,0.8);
  font-size: 1rem;
  letter-spacing: 0.8px;
  text-align: left;
}

.presentation__text--bigger-line {
  font-size: 1.3rem;
  line-height: 220%;
  margin: 0;
  transition: 0.2s ease-in-out;
}

.presentation__tech-info {
  padding-left: 25px;
  /* opacity: 0.9; */
  margin-top: 5px;
  margin-bottom: 15px;
}

.presentation__tech-info p {
  margin-bottom: 10px;
}

.presentation__tech-info .fa {
  margin-right: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
}

.presentation__link {
  cursor: pointer;
  background-color: rgba(var(--main-rgb), 0.6);
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
}

.presentation__link:hover {
  background-color: rgba(var(--main-rgb), 0.8);
  color:#fff;
}

.presentation__link + .presentation__link {
  margin-left: 5px;
}

@media(max-width: 780px) {
  .presentation {
    padding: 100px 10px;
  }

  .presentation__tech {
    width: 100%;
  }
}
</style>