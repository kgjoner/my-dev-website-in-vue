<template>
  <div class="go-to-top"
    :class="{'go-to-top--hidden': scrollY < 200}">
    <button class="go-to-top__btn"
      @click="scrollToTop">
      <i class="fa fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  name:'GoToTop',
  data: function() {
    return {
      scrollY: 0
    }
  },
  methods: {
    scrollToTop() {
      this.$store.dispatch('scrollPage', {
        destination: 'app',
        offset: 0,
        duration: 900
      })
    },
    updateScrollY() {
      this.scrollY = window.scrollY
    }
  },
  mounted() {
		window.addEventListener('scroll', this.updateScrollY)
	},
	destroyed() {
		window.removeEventListener('scroll', this.updateScrollY)
	},
}
</script>

<style>
.go-to-top {
  position: fixed;
  bottom: 50px;
  right: 30px;

  opacity: 1;
  transition: 2s ease-in-out;
}

.go-to-top--hidden {
  opacity: 0;
}

.go-to-top__btn {
  height: 40px;
  width: 40px;
  background-color: var(--dark-color);
  border-radius: 4px;
  color: #f2f2f2;
  border: none;
  opacity: 0.2;
  transition: 0.2s ease-in-out;
}

.go-to-top--hidden .go-to-top__btn {
  visibility: hidden;
}

.go-to-top__btn:hover {
  opacity: 0.5;
}

body:not(.tab-user) .go-to-top__btn {
  outline: none;
}
</style>