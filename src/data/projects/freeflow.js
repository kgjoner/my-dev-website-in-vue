import freeflow from '../../assets/img/freeflow.svg'
import presentation from '../../assets/img/freeflow-presentation.png'
import freeflowPic1 from '../../assets/img/freeflow_1.jpg'
import freeflowPic2 from '../../assets/img/freeflow_2.jpg'
import freeflowPic3 from '../../assets/img/freeflow_3.jpg'
import freeflowPic4 from '../../assets/img/freeflow_4.jpg'
import freeflowPic5 from '../../assets/img/freeflow_5.jpg'

export default {
  name: 'Freeflow',
  logo: freeflow,
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
  pics: [freeflowPic1, freeflowPic2, freeflowPic3, freeflowPic4, freeflowPic5],
  presentation
}