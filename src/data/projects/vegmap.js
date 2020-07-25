import vegmap from '../../assets/img/vegmap.svg'
import presentationReg from '../../assets/img/vegmap-presentation.png'
import presentationMob from '../../assets/img/vegmap-presentation-mob.png'
import vegmapPic1 from '../../assets/img/vegmap_1.jpg'
import vegmapPic2 from '../../assets/img/vegmap_2.jpg'
import vegmapPic3 from '../../assets/img/vegmap_3.jpg'
import vegmapPic4 from '../../assets/img/vegmap_4.jpg'

export default {
  name: 'Vegmap',
  mainColor: '#1dad5e',
  logo: vegmap,
  description: 'A web app for mapping vegan restaurants.',
  link: 'https://vegmap.netlify.app',
  github: 'https://github.com/kgjoner/vegmap',
  text: [
    'It searches for vegan restaurants near the user location and displays them in a map. The restaurants data are gotten from a mongo database while the map consumes the Google Map API.',
    'To add new restaurants or to edit registered ones the user must log in with their Facebook account. They can also vote in their favorite ones.',
    'In addition, every update is communicated by websockets to the users who are seeing the target restaurant.'
  ],
  technicalInfo: {
    backend: {
      tech: 'Node.js',
      // infrastructure: 'Heroku.', 
      database: 'Mongodb.', 
      modules: 'Express, Mongoose and Socket.io'
    },
    frontend: {
      tech: 'React',
      // infrastructure: 'Netlify.',
      modules: 'Google-map-react, React-facebook-login, Socket.io-client'
    }
  },
  pics: [vegmapPic1, vegmapPic2, vegmapPic3, vegmapPic4],
  presentation: {
    reg: presentationReg,
    mob: presentationMob
  }
}