<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Content',
  computed: {
		...mapState({
			monitorActiveSection: state => state.monitorActiveSection,
			sections: state => state.sections
		}),
		sectionsElementsLastToFirst() {
      if(!this.sections || !this.sections.length) return []
			const sectionsElements = this.sections.map(section => {
				return document.getElementById(section.anchor.slice(1))
			})
			return sectionsElements.sort((a, b) => b.offsetTop - a.offsetTop)
		},
  },
  methods: {
		monitorScroll() {
			this.$store.dispatch('monitorScroll', this.sectionsElementsLastToFirst)
		}
	},
	watch: {
		sectionsElementsLastToFirst() {
			this.monitorScroll()
		}
	},
	created() {
		if(process.isClient) {
			window.addEventListener('scroll', this.monitorScroll)
		}
	},
	destroyed() {
		window.removeEventListener('scroll', this.monitorScroll)
	}
}
</script>

<style>

.content {
  grid-area: content;
}

</style>
