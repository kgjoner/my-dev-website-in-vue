import presentationMob from '../../assets/img/freeflow-presentation-mob.png'

export default {
  name: 'Freeflow',
  logo: {
    top: 0,
    left: -70,
  },
  description: 'A web app for building flowcharts.',
  mainColor: '#112D44',
  link: 'https://freeflowchart.netlify.app/',
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
  presentationReg: {
    top: 0,
    left: -700,
  },
  presentationMob
}