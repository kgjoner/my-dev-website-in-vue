<template>
  <div id="app" :class="{'only-content': isBookPage}">
    <Header v-if="!isBookPage"/>
    <div v-else class="book-page-header">
      <BookPageHeader/>
    </div>
    <Content />
    <Footer v-show="!isBookPage"/>
  </div>
</template>

<script>

import Header from './components/template/Header'
import BookPageHeader from './components/template/BookPageHeader'
import Content from './components/template/Content'
import Footer from './components/template/Footer'

export default {
  name: 'App',
  components: { Header, Content, Footer, BookPageHeader },
  computed: {
    isBookPage() {
      return this.$route.fullPath === '/cavaleiro-de-sirius' || this.$route.fullPath === '/chamado-do-cacador'
        || this.$route.fullPath === '/anseio-pelas-artes-proibidas'
    }
  }
}

</script>

<style>

@font-face {
  font-family: 'Charlemagne';
  src: url('./assets/fonts/CharlemagneStd-Regular.ttf');
}

.book-page-header {
  content: ' ';
  width: 100vw;
  height: 60px;
  overflow: hidden;
}

body {
  margin: 0;
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
  grid-template-rows: 90px 1fr 40px;
  grid-template-areas:
  'header'
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
