<template>
  <section class="blog" :id="homeSections.BLOG">
    <div class="app__container">
      <h2 class="app__heading">
        Blog
      </h2>
      <ul class="blog__posts-list">
        <li v-for="post in posts" :key="post.id"
          class="blog__post">
          <g-link :to="`blog/${post.slug}`">
            <i class="fa fa-file-text"></i>
            <div>
              <h3 class="blog__post-title">
                {{post.title}}
              </h3>
              <p class="blog__post-date">
                {{post.publishedAt}}
              </p>
            </div>
          </g-link>
        </li>
      </ul>
      <div class="blog__alert">
        <div>
          <div class="blog__point"></div>
          <div class="blog__point"></div>
          <div class="blog__point"></div>
        </div>
        <p class="blog__message">
          More posts coming soon
        </p>
      </div>
    </div>
  </section>
</template>

<static-query>
query {
	posts: allPost(sortBy: "publishedAt", order: DESC, limit: 10) {
		edges {
			node {
				id
        title
        publishedAt
        slug
      }
    }
  }
}
</static-query>

<script>
import { homeSections } from '../../constants'

export default {
  name: 'Blog',
  data: function() {
    return {
      homeSections
    }
  },
  computed: {
    posts() {
			return this.$static.posts.edges.map(a => a.node)
    }
  }
}
</script>

<style>
.blog {
  padding: 100px 0;
  background: linear-gradient(to bottom, #c9c9c9, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog .app__heading::after {
  content: 'NEW !';
  position: absolute;
  font-size: 1rem;
  top: 5px;
  margin-left: 20px;
  padding: 5px 10px;
  background-color: var(--main-color);
  color: #f2f2f2;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.blog__posts-list {
  padding-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.blog__post {
  list-style: none;
  padding: 10px 20px;
  text-align: left;
  width: 100%;
  max-width: 720px;
  background-color: #f2f2f2;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.blog__post:hover {
  border-color: var(--main-color);
  /* box-shadow: 0 0 5px var(--main-color); */
  box-shadow: 3px 3px 5px rgba(0,0,0,0.15);
  transform: scale(1.02);
}

.blog__post a {
  color: inherit;
  display: flex;
}

.blog__post i {
  margin-right: 15px;
  margin-top: 5px;
  font-size: 1.5rem;
  color: var(--main-color);
}

.blog__post-title {
  font-family: 'Baloo 2';
  margin-bottom: 2px;
}

.blog__post-date {
  font-style: italic;
  opacity: 0.9;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.blog__alert {
  height: 220px;
  max-width: 720px;
  margin-top: 40px;
  padding: 20px;
  background-color: #f2f2f2;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.blog__alert > div {
  min-height: 120px;
}

.blog__point {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.1);
  background-color: var(--main-color);
  margin: 20px auto;
}

.blog__point:nth-child(1) {
  animation: twinkle 1.5s infinite;
}

.blog__point:nth-child(2) {
  animation: twinkle 1.5s 0.5s infinite;
}

.blog__point:nth-child(3) {
  animation: twinkle 1.5s 1s infinite;
}

@keyframes twinkle {
  0%{
    height: 10px;
    width: 10px
  }
  44% {
    height: 10px;
    width: 10px
  }
  66% {
    height: 18px;
    width: 18px;
  }
  100% {
    height: 10px;
    width: 10px
  }
}

.blog__message {
  font-family: 'Baloo 2';
  margin-top: 20px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.6);
  font-weight: bold;
}

@media(max-width: 780px) {
  .blog {
    padding: 100px 10px;
  }
}
</style>