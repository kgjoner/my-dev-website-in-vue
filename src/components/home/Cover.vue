<template>
	<section class="cover" :id="homeSections.HERO">
		<div class="app__container">
			<div class="cover__container">
				<p v-for="(line, index) in text" :key="index" 
					class="cover__text" :class="{'cover__text--first': index === 0}" >
					{{line}}
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import { homeSections } from '../../constants'

export default {
	name: "Cover",
	data: function() {
		return {
			text: [
				`Hi, I'm Kaio.`,
				'Let\'s build a website!',
			],
			homeSections
		}
	}
}
</script>

<style>

.cover {
	position: relative;
	height: 100vh;
	width: 100%;
	background-image: url('../../assets/img/cover.jpg');
	background-size: cover;
	background-position: 70% 20%;

	transform: scaleX(-1);
}

.cover::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: #0e3c4d;
	opacity: 0.4;
}

.cover__container {
	position: relative;
	overflow: hidden;
	transform: scaleX(-1);
	cursor: default;
	user-select: none;
	padding-left: 20vw;
	padding-top: 30vh;
}

.cover__text {
	color: rgba(255, 255, 255, 0.7);
	margin: 0;
	line-height: 120%;
	font-size: 2.2rem;
	font-family:'Baloo 2', cursive;
	letter-spacing: 1px;
	text-align: left;
	animation: appear 1s 1s backwards;
}

.cover__text--first {
	font-size: 1.7em;
	line-height: 150%;
	margin: 10px 0 10px 0;
	animation: appear 1s ease-out;
}

@keyframes appear {
	0%{
		position: relative;
		top: 30px;
		opacity: 0;
	}
	100% {
		position: relative;
		top: 0;
		opacity: 1;
	}
}

@media(max-width: 500px) {
	.cover__container {
		padding-left: 20px;
	}
}

</style>
