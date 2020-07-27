<template>
  <div class="index-controller" ref="indexController">
    <button class="index-controller__action"
      @click="() => changeIndex(previousIndex)"
      aria-label="display previous project">
      <i class="fa fa-chevron-left"></i>
      prev
    </button>
    <button v-for="(_, index) in new Array(contentLength)" :key="index"
      class="index-controller__marker"
      :class="{'index-controller__marker--selected': selectedIndex === index}"
      @click="() => changeIndex(index)"
      :aria-label="`display project ${index + 1}`">
    </button>
    <button class="index-controller__action"
      @click="() => changeIndex(nextIndex)"
      aria-label="display next project">
      next
      <i class="fa fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'IndexController',
  props: ['contentLength', 'selectedIndex', 'shouldListen'],
  computed: {
    nextIndex() {
      let nextIndex = this.selectedIndex + 1
      if(nextIndex > this.contentLength - 1) nextIndex = 0
      return nextIndex
    },
    previousIndex() {
      let previousIndex = this.selectedIndex - 1
      if(previousIndex < 0) previousIndex = this.contentLength - 1
      return previousIndex
    },
  },
  methods: {
    changeIndex(newIndex) {
      this.$emit('indexChange', newIndex)
    },
    listenArrows(e) {
      if(e.key === 'ArrowLeft') {
        this.changeIndex(this.previousIndex)
      } else if(e.key === 'ArrowRight') {
        this.changeIndex(this.nextIndex)
      }
    },
  },
  watch: {
    shouldListen(value) {
      if(!process.isClient) return
      if(value) {
        window.addEventListener('keydown', this.listenArrows)
      } else {
        window.removeEventListener('keydown', this.listenArrows)
      }
    }
  }
}
</script>

<style>
.index-controller {
  display: flex;
  justify-content: flex-start;
  /* padding-left: 70px; */
  align-items: center;
  position: relative;
  z-index: 2;
}

.index-controller__action {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: rgba(0,0,0,0.6);
  border-radius: 4px;
  border: none;
  transition: opacity 0.2s ease-in-out;
  font-family: 'Baloo 2';
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.8px;
  opacity: 0.6;
}

.index-controller__action .fa-chevron-left {
  color: var(--main-color);
  margin-right: 5px;
}

.index-controller__action .fa-chevron-right {
  color: var(--main-color);
  margin-left: 5px;
}

.index-controller > * + .index-controller__action {
  margin-left: 8px;
}

.index-controller__marker {
  padding: 0;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: none;
  background-color: rgba(var(--main-rgb),1);
  opacity: 0.5;
  margin-left: 8px;
}

.index-controller__marker--selected {
  height: 18px;
  width: 18px;
  opacity: 1;
}

.index-controller__action:hover,
.index-controller__marker:hover {
  opacity: 1;
}

body:not(.tab-user) .index-controller *:focus {
  outline: none;
}
</style>