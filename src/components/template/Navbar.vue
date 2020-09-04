<template>
	<nav class="navbar" :class="{'navbar--transparent': isHeaderTransparent}">
		<ul class="navbar__menu" role="menu">

			<li v-for="(section, index) in Object.values(homeSections)" 
				:key="index"
				v-show="index !== 0
					&& ( windowWidth > 780 
					|| (activeSection == section && windowWidth >= 350) )"  
				class="navbar__link"
				:class="{'navbar__link--active': activeSection === section
					|| (section === homeSections.BLOG && isBlogPage)}"
				role="menuitem"
				@click="() => navigateTo(section)"
			>
					<a href="">
						{{section}}
					</a>
			</li>

		</ul>
	</nav>
</template>

<script>
import { mapState } from 'vuex'
import { homeSections, headerHeight } from '@/constants'

export default {
	nome: 'Navbar',
	data: function() {
		return {
			homeSections
		}
	},
	computed: {
		...mapState({
			windowWidth: state => state.windowWidth,
			isHeaderTransparent: state => state.isHeaderTransparent,
			activeSection: state => state.activeSection
		}),
		isBlogPage() {
			return this.$route.fullPath.includes('/blog')
		}
	},
	methods: {
		navigateTo(section) {
			if(this.$route.fullPath === '/') {
				this.scrollTo(section)
			} else {
				this.$router.push('/', () => {
					setTimeout(() => this.scrollTo(section), 300)
				})
			}
		},
		scrollTo(section) {
			this.$store.dispatch('scrollPage', {
				destination: section, 
				offset: headerHeight - 60, 
				duration: 900
			})
		}
	}
}
</script>

<style>

nav.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	/* font-family: 'B612 Mono'; */
	font-family: 'Baloo 2';
	font-size: 1.2rem;
	padding: 0px;
	height: 60px;
}

.navbar__menu {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: 0;
	margin-top: 0;
	padding-left: 0;
	height: 60px;
}

.navbar__link {
	list-style: none;
	padding: 0 20px;
	height: 50px;
	color: var(--dark-color);
	cursor: pointer;
	font-weight: 500;
	font-size: 0.9em;
	display: flex;
	align-items: center;
	position: relative;
	text-transform: capitalize;
}

.navbar--transparent .navbar__link {
	color: var(--bg-color);
}

.navbar__link::after {
	content: ' ';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	border-bottom: 3px solid var(--main-color);
}

.navbar--transparent .navbar__link::after {
	border-bottom: 1px solid var(--bg-color);
}

@media(hover: hover) {
	.navbar__link:hover::after {
		width: 100%;
		left: 0;
		transition: 0.5s;
	}
}


.navbar__link--active::after {
	width: 100%;
	left: 0;
	border-bottom: 3px solid var(--main-color);
	color: var(--dark-color);
}

.navbar__link a,
.navbar__link a:hover {
	color: inherit;
}
</style>
