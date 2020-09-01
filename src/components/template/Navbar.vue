<template>
	<nav class="navbar" :class="{'navbar--transparent': isHeaderTransparent}">

		<Logo 
			:handleClick="e => scrollIt(e, 0, headerHeight)"
			:light="isHeaderTransparent"
		/>

		<ul class="navbar__menu" role="menu">
			<li v-for="(section, index) in Object.values(sections)" :key="index" 
				class="navbar__link" role="menuitem"
				:class="{'navbar__link--active': activeSection === section}"
				v-show="index !== 0
					&& ( windowWidth > 700 
					|| (activeSection == section && windowWidth >= 350) )"  
				@click="e => scrollIt(e, index, (headerHeight - 60))">
					<a href="">{{section}}</a>
			</li>
		</ul>

		<button v-if="wasMounted && windowWidth && windowWidth <= 700" 
			class="navbar__btn" :class="{'navbar__btn--white': isHeaderTransparent}" 
			@click="toggleDropdown">
			<i class="navbar__icon fa fa-bars"></i>
		</button>

		<ul v-if="wasMounted && showDropdown && windowWidth <= 700" 
			class="navbar__dropdown" role="menu">
			<li v-for="(section, index) in Object.values(sections)" :key="index" 
				class="navbar__link navbar__link--white"
				role="menuitem"
				v-show="index !== 0"
				@click="e => scrollIt(e, index, (headerHeight-60))">
				{{section}}
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapState } from 'vuex'
import { sections } from '../../constants'
import Logo from '../util/Logo'

export default {
	nome: 'Navbar',
	components: { Logo },
	data: function() {
		return {
			showDropdown: false,
			wasMounted: false,
			sections
		}
	},
	computed: {
		...mapState({
			windowWidth: state => state.windowWidth,
			headerHeight: state => state.headerHeight,
			isHeaderTransparent: state => state.isHeaderTransparent,
			monitorActiveSection: state => state.monitorActiveSection,
			activeSection: state => state.activeSection
		}),
		sectionsElementsLastToFirst() {
			const sectionsElements = Object.values(this.sections).map(section => {
				return document.getElementById(section)
			})
			return sectionsElements.sort((a, b) => b.offsetTop - a.offsetTop)
		},
	},
	methods: {
		scrollIt(e, sectionIndex, offset = 0, duration = 900) {
			e.preventDefault()
			if(this.showDropdown) this.toggleDropdown()
			const destination = this.sectionsElementsLastToFirst[this.sectionsElementsLastToFirst.length - 1 - sectionIndex]

			this.$store.dispatch('scrollPage', {destination, offset, duration})
		},

		monitorScroll() {
			this.$store.dispatch('monitorScroll', this.sectionsElementsLastToFirst)
		},

		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		}
	},
	mounted() {
		window.addEventListener("scroll", this.monitorScroll)
		this.wasMounted = true
	},
	destroyed() {
		window.removeEventListener("scroll", this.monitorScroll)
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

.navbar__btn {
	background-color: transparent;
	border: 2px solid rgba(var(--dark-rgb), 0.8);
	border-radius: 5px;
	height: 40px;
	width: 40px;
	color: #fcfcfc;
	outline: none;
	cursor: pointer;
	margin-left: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.navbar__btn:hover {
	border-color: var(--main-color);
}

.navbar__btn--white {
	border-color: var(--bg-color);
}

.navbar__icon {
	color: rgba(var(--dark-rgb), 0.8);
}

.navbar__btn--white .navbar__icon {
	color: var(--bg-color);
}

.navbar__icon:hover,
.navbar__btn:hover .navbar__icon {
	color: var(--main-color);
}

.navbar__dropdown {
	padding: 20px 50px;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	top: 60px;
	left: -10px;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 1px 3px 5px rgb(0,0,0,0.4);
	margin: 0;
}

.navbar__link--white {
	margin-bottom: 10px;
	color: #fff;
}
</style>
