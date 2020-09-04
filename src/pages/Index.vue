<template>
  <Layout>
    <div class="home">
      <Cover />
      <Projects />
      <Presentation />
      <Blog />
      <Contact />
    </div>
  </Layout>
</template>

<script>
import { homeSections } from '@/constants'
import Cover from '@/components/home/Cover'
import Presentation from '@/components/home/Presentation'
import Projects from '@/components/home/Projects'
import Blog from '@/components/home/Blog'
import Contact from '@/components/home/Contact'

export default {
  name: 'Home',
  metaInfo: { 
    title: '',
    titleTemplate: 'Kaio G. | Web Developer',
    meta: [
      {
        name: 'description',
        content: 'Kaio\'s developer website, a place to display his works, posts and ideas about web development.'
      }
    ],
  },
  components: { Cover, Presentation, Projects, Blog, Contact },
  mounted() {
    this.$store.dispatch('updateSections', Object.values(homeSections).slice(1).map(section => ({
      anchor: '#' + section,
      value: section.charAt(0).toUpperCase() + section.slice(1),
      depth: 2
    })))
  }
}
</script>

<style>
.home {
  max-width: 100vw;
}
</style>
