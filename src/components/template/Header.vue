<template>
	<header class="header">
		<div class="brand">
			<img src="@/assets/img/logotipo-velgard.svg" alt="">
		</div>
		<Navbar />
	</header>
</template>

<script>

import Navbar from './Navbar'

export default {
  name: 'Header',
  components: { Navbar }
}

</script>

<style>

.header {
	grid-area: header;
	background: rgba(9,20,20);
	content: '&nbsp;';
	position: fixed;
	width: 100vw;
	z-index: 95;
	height: 90px;

	display: flex;
	justify-content: space-between;
	align-items: center;
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
