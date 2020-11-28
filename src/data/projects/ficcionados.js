import presentationMob from '../../assets/img/ficcionados-presentation-mob.png'

export default {
  name: 'Ficcionados',
  mainColor: '#1D7FD8',
  logo: {
    top: 0,
    left: 0,
  },
  description: 'A blog about fiction writing.',
  link: 'https://www.ficcionados.com.br/',
  github: 'https://github.com/kgjoner/ficcionados',
  text: [
    'As a common blog, it displays recent posts and allows users search for old ones either by a query tool or navigating by a tree of categories.',
    'There is also a CMS for the blog writers adding posts, managing categories, and uploading images.',
    'It is a JAMstack blog, and the routes were generated using Gridsome.'
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
      modules: 'Gridsome, Vuex, Vue-router, Bootstrap-vue.'
    }
  },
  presentationReg: {
    top: 0,
    left: 0
  },
  presentationMob
}