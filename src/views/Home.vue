<template>
  <div class="home">
    <Cover />
    <Presentation />
    <Projects />
    <Contact />
  </div>
</template>

<script>
import Cover from '@/components/home/Cover'
import Presentation from '@/components/home/Presentation'
import Projects from '@/components/home/Projects'
import Contact from '@/components/home/Contact'

export default {
  name: 'Home',
  components: { Cover, Presentation, Projects, Contact },
  mounted() {
    document.getElementsByClassName('content')[0].classList.add('content-ready')
  }
}
</script>

<style>

</style>

