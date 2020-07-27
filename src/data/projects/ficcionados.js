import ficcionados from '../../assets/img/ficcionados.svg'
import presentationReg from '../../assets/img/ficcionados-presentation.png'
import presentationMob from '../../assets/img/ficcionados-presentation-mob.png'
import ficcionadosPic1 from '../../assets/img/ficcionados_1.jpg'
import ficcionadosPic2 from '../../assets/img/ficcionados_2.jpg'
import ficcionadosPic3 from '../../assets/img/ficcionados_3.jpg'
import ficcionadosPic4 from '../../assets/img/ficcionados_4.jpg'
import ficcionadosPic5 from '../../assets/img/ficcionados_5.jpg'

export default {
  name: 'Ficcionados',
  mainColor: '#1D7FD8',
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
  pics: [ficcionadosPic1, ficcionadosPic2, ficcionadosPic3, ficcionadosPic4, ficcionadosPic5],
  presentationReg,
  presentationMob
}