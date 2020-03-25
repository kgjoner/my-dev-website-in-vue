<template>
  <div id="app">
    <Header/>
    <Content />
    <Footer />
  </div>
</template>

<script>
import './assets/css/global.css'
import Header from './components/template/Header'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

export default {
  name: 'App',
  components: { Header, Content, Footer },
  methods: {
    checkWidth() {
      this.$store.commit('changeWidth')
    }
  },
  mounted() {
    window.addEventListener("resize", this.checkWidth);
  }
}

</script>

<style>

body {
  margin: 0;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#eeeae7;

  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 40px;
  grid-template-areas:
  'content'
  'footer';
  max-width: 100vw;
}

#app.only-content {
  grid-template-areas:
  'header'
  'content'
  'content';
}
</style>
