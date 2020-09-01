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
import Cover from '@/components/home/Cover'
import Presentation from '@/components/home/Presentation'
import Projects from '@/components/home/Projects'
import Blog from '@/components/home/Blog'
import Contact from '@/components/home/Contact'

export default {
  name: 'Home',
  metaInfo: { title: '' },
  components: { Cover, Presentation, Projects, Blog, Contact },
}
</script>

<style>
.home {
  max-width: 100vw;
}
</style>
