<template>
	<header class="header" 
		:class="[{'header--transparent': isHeaderTransparent},
			{'header--not-fixed': notFixed}]">
		<div class="app__container">
			<div class="header__container">

				<Logo 
					:handleClick="toHome"
					:light="isHeaderTransparent"
				/>
				<Navbar />
				<NavDrawer 
					v-if="wasMounted && windowWidth && windowWidth <= 780"
					v-slot="{ toggleDrawer }"
				>
					<button 
						class="header__action" 
						@click="toggleDrawer"
					>
						<i class="header__icon fa fa-bars"></i>
					</button>
				</NavDrawer>

			</div>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import { homeSections, headerHeight } from '@/constants'
import Navbar from './Navbar'
import NavDrawer from './NavDrawer'
import Logo from '../util/Logo'

export default {
  name: 'Header',
	components: { Logo, Navbar, NavDrawer },
	data: function() {
		return {
			wasMounted: false,
			homeSections
		}
	},
	computed: {
		...mapState({
			isHeaderTransparent: state => state.isHeaderTransparent,
			windowWidth: state => state.windowWidth
		}),
		notFixed() {
			return this.$route.fullPath.includes('/blog/') && this.windowWidth > 780
		}
 	},
	methods: {
		toHome() {
			if(this.$route.fullPath === '/') {
				this.$store.dispatch('scrollPage', {
					destination: homeSections.HERO, 
					offset: headerHeight, 
					duration: 900
				})
			} else {
				this.$router.push('/')
			}
		}
	},
	mounted() {
		this.wasMounted = true
	}
}

</script>

<style>

.header {
	grid-area: header;
	background-color: var(--bg-color);
	position: fixed;
	width: 100%;
	z-index: 95;
	height: 60px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	box-shadow: 0 0 15px 3px rgba(0,0,0,0.3);
}

.header--not-fixed {
	position: absolute;
}

.header--transparent {
	background-color: transparent;
	box-shadow: none;
}

.header__container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header__action {
	background-color: transparent;
	border: none;
	height: 40px;
	width: 40px;
	outline: none;
	cursor: pointer;
	margin-left: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.header__icon.fa {
	color: var(--main-color);
	font-size: 1.5rem;
}

.header--transparent .header__icon {
	color: var(--bg-color);
}
</style>
