<template>
  <div class="home">
    <Cover />
    <Books />
    <Quotes />
    <About />
    <Contact />
  </div>
</template>

<script>
import Cover from '@/components/home/Cover'
import Books from '@/components/home/Books'
import Quotes from '@/components/home/Quotes'
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'

export default {
  name: 'Home',
  components: { Cover, Books, Quotes, About, Contact },
  mounted() {
    document.getElementsByClassName('content')[0].classList.add('content-ready')
  }
}
</script>

<style>

</style>

