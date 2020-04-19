<template>
	<header class="header" :class="{'header--transparent': isHeaderTransparent}">
		<Navbar />
	</header>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './Navbar'

export default {
  name: 'Header',
	components: { Navbar },
	computed: {
		...mapState({
			isHeaderTransparent: state => state.isHeaderTransparent
		})
	}
}

</script>

<style>

.header {
	grid-area: header;
	background-color: var(--bg-color);
	position: fixed;
	width: 100vw;
	z-index: 95;
	height: 60px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	box-shadow: 0 0 15px 3px rgba(0,0,0,0.3);
}

.header--transparent {
	background-color: transparent;
	box-shadow: none;
}
</style>
