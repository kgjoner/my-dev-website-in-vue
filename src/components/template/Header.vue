<template>
	<header class="header" :class="{'transparent-header': isHeaderTransparent}">
		<Navbar @changeHeader="changeTransparency" />
	</header>
</template>

<script>

import Navbar from './Navbar'

export default {
  name: 'Header',
	components: { Navbar },
	data: function() {
			return {
				isHeaderTransparent: true
			}
	},
	methods: {
		changeTransparency(isTransparent) {
			this.isHeaderTransparent = isTransparent
		}
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

.header.transparent-header {
	background-color: transparent;
	box-shadow: none;
}

.header .brand {
	margin: 10px;
}

.header img {
	margin-left: 40px;
	height: 90px;
	opacity: 0.8;
}

@media(max-width: 540px) {
	.header img {
		margin-left: 20px;
		height: 75px;
	}
}

@media(max-width: 400px) {
	.header img {
		margin-left: 10px;
		height: 70px;
	}
}
</style>
