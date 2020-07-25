<template>
  <Layout>
    <div class="home">
      <Cover />
      <Projects />
      <Presentation />
      <Contact />
    </div>
  </Layout>
</template>

<script>
import Cover from '@/components/home/Cover'
import Presentation from '@/components/home/Presentation'
import Projects from '@/components/home/Projects'
import Contact from '@/components/home/Contact'

export default {
  name: 'Home',
  metaInfo: { title: '' },
  components: { Cover, Presentation, Projects, Contact },
}
</script>

<style>
.home {
  max-width: 100vw;
}
</style>
