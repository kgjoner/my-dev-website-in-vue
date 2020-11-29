export default {
  name: 'Vegmap',
  mainColor: '#1dad5e',
  logo: {
    top: -70,
    left: 0,
  },
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
  presentation: {
    top: -450,
    left: 0
  }
}