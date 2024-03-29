<template>
  <Layout>
  <div class="post">
    <aside v-if="windowWidth && windowWidth > 780"
      class="post__menu">
      <NavDrawer 
        v-slot="{ toggleDrawer }"
        left  
      >
        <button 
          class="post__side-btn" 
          @click="toggleDrawer"
        >
          Table of Contents
        </button>
      </NavDrawer>
    </aside>

    <div class="app__container">
      <div class="post__content">
        <h1 :id="$page.post.headings[0].anchor.split('#')[1]">
          {{$page.post.title}}
        </h1>
        <div class="post__details">
          <time class="post__detail"
            :datetime="$page.post.publishedAt">
            {{ $page.post.publishedAt }}
          </time>
          <p class="post__detail">
            {{$page.post.timeToRead}}min read
          </p>
        </div>
      </div>
      <div class="post__content"
        v-html="$page.post.content.split('</h1>')[1]">
      </div>
      <div class="post__comments">
        <Disqus
          :identifier="$route.params.slug"
          :url="'https://dev.kgjoner.com.br' + $route.fullPath.split('#')[0]"
        ></Disqus>
      </div>
    </div>
  </div>
  <GoToTop />
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post(id: $id) {
    id
    title
    path
    content
    publishedAt
    headings {
      depth
      value
      anchor
    }
    timeToRead
  }
}
</page-query>

<script>
import { mapState } from 'vuex'
import NavDrawer from '@/components/template/NavDrawer'
import GoToTop from '@/components/util/GoToTop'
import hljs from 'highlight.js'

export default {
  name: 'Post',
  components: { NavDrawer, GoToTop },
  metaInfo() {
    return {
      title: this.$page.post.title,
      titleTemplate: '%s | Kaio G.'
    }
  },
  data: function() {
    return {
      wasMounted: false,
      showDropdown: false
    }
  },
  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth
		}),
    headings() {
      const headings = [...this.$page.post.headings]
      return headings.filter(c => c.depth < 4)
    },
  },
  mounted() {
    this.$store.dispatch('updateSections', this.headings)
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
    this.wasMounted = true
  },
}
</script>

<style>

.post {
  background-color: rgb(240, 240, 240);
  padding-top: 60px;
  padding-left: 70px;
  max-width: 100vw;
  overflow-x: hidden;
}

.post__menu {
  position: fixed;
  top: 60px;
  left: 0px;
  padding-bottom: 50px;
  height: 100vh;
  width: 300px;

  display: flex;
  flex-direction: column;
  z-index: 96;
}

.post__side-btn {
  background-color: transparent;
  color: var(--main-color);
  border: 2px solid var(--main-color);
  border-bottom: none;
  padding: 5px 10px;
  transform-origin: 0% 100%;
  transform: rotate(90deg);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: absolute;
  top: 150px;
  left: 0px;
  transition: 0.2s ease-in-out;
}

body:not(.tab-user) .post__side-btn {
  outline: none;
}

.post__side-btn:hover {
  background-color: var(--main-color);
  color: var(--bg-color);
}

.post__comments {
  max-width: 720px;
  margin: 80px auto 0 auto;
  padding-bottom: 80px;
}

.post__content {
  width: calc(100vw - 300px);
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
}

.post h1 {
  padding-top: 50px;
  margin-bottom: 15px;
}

.post h2 {
  margin-top: 80px;
  margin-bottom: 20px;
  position: relative;
}

.post h2::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 0;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: var(--main-color);
}

.post h3 {
  margin-top: 60px;
}

.post h3::before {
  content: '/';
  margin-right: 3px;
  font-size: 1.2em;
  color: var(--main-color);
}

.post h4 {
  margin-top: 40px;
  font-style: italic;
  font-size: 1.4rem;
  opacity: 0.9;
}

.post p {
  font-size: 1.15rem;
  letter-spacing: 0.4px;
}

.post__content a {
  font-weight: bold;
  color: inherit;
  border-bottom: 2px solid var(--main-color);
  cursor: pointer;
  transition: 0.2s ease-in-out color;
}

.post a:hover {
  color: var(--main-color);
}

.post blockquote {
  background-color: rgba(var(--main-rgb), 0.1);
  padding: 15px 10px;
  border-left: 8px solid var(--main-color);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.post blockquote p:last-child {
  margin-bottom: 0;
}

.post code {
  background-color: rgba(var(--main-rgb), 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  color: #1681a8;
}

.post pre {
  padding: 20px 10px;
  background-color: #383838;
  /* background-color: rgba(0,0,0,0.6); */
  border-radius: 4px;
  margin: 30px 0 40px 0;
}

.post pre + pre {
  margin-top: 0;
  margin-bottom: 20px;
  position: relative;
  top: -20px;
}

.post pre code {
  background-color: transparent;
  color: #bababa;
}

.post__details {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  max-width: 720px;
  margin: 0 auto;
  font-style: italic;
  opacity: 0.8;
  margin-bottom: 30px;
}

.post .post__detail {
  font-size: 0.9rem;
}

.post__detail + .post__detail {
  margin-left: 5px;
}

.post__detail + .post__detail::before {
  content: '\2022';
  margin: 0 5px;
}

@media(min-width: 1440px) {
  .post__menu {
    left: calc(50vw - 700px);
  }
}

@media(max-width: 1200px) {
  .post {
    padding-left: 150px;
  }
}

@media(max-width: 1100px) {
  .post {
    padding-left: 250px;
  }
}

@media(max-width: 780px) {
  .post {
    padding: 40px 20px 0 20px;
  }

  .post__details {
    justify-content: flex-start;
  }

  .post__content {
    width: auto;
  }
}
</style>