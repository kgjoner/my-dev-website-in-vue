<template>
  <ul class="table-of-contents" ref="table">
    <li v-for="(heading, index) in headings" :key="index"
      class="table-of-contents__item"
      :class="[`table-of-contents__item--${heading.depth}`,
      { 'table-of-contents__item--selected': activeSection === heading.anchor.split('#')[1]}]">
      <a @click="scrollTo(heading.anchor)">
        {{heading.depth === 1 ? 'Introduction' : heading.value}}
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TableOfContents',
  props: ['headings'],
  computed: mapState(['activeSection']), 
  methods: {
    scrollTo(anchor) {
      const destination = document.getElementById(anchor.split('#')[1])
      this.$store.dispatch('scrollPage', {
        destination,
        offset: 30,
        duration: 800
      })
    }
  },
  watch: {
    activeSection(current, old) {
      const itemEl = document.querySelector('.table-of-contents__item--selected')
      if(!itemEl || !current || !old) return

      const scrollDown = document.getElementById(current).offsetTop 
        > document.getElementById(old).offsetTop
      const tableEl = this.$refs.table
      if(itemEl.offsetTop - tableEl.offsetTop > tableEl.getBoundingClientRect().height/2
        && scrollDown) {
        tableEl.scroll(0, tableEl.scrollTop + itemEl.getBoundingClientRect().height)
      } else if (!scrollDown) {
        tableEl.scroll(0, tableEl.scrollTop - itemEl.getBoundingClientRect().height)
      }
    }
  }
}
</script>

<style>

.table-of-contents {
  padding-left: 10px;
  opacity: 0.4;
  transition: 0.2s ease-in-out;

  max-width: 220px;
  overflow-y: scroll;
}

.table-of-contents:hover {
  opacity: 1;
}

.table-of-contents::-webkit-scrollbar {
  width: 10px;
}

.table-of-contents__item {
  list-style: none;
  font-size: 0.9rem;
  position: relative;
}

.table-of-contents__item a {
  color: rgba(0,0,0,0.8);
  cursor: default;
}

.table-of-contents__item--selected,
.table-of-contents__item--selected a {
  color: var(--main-color);
  font-weight: bold;
}

.table-of-contents__item--selected::after {
  content: '\220E';
  /* content: '\2771'; */
  position: absolute;
  top: 0;
  left: -13px;
}

/* .table-of-contents__item--3::before {
  content: '\2043';
  padding-left: 2px;
  margin-right: 4px;
} */

.table-of-contents__item--3 {
  padding-left: 15px;
}
</style>