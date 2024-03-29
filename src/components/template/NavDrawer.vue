<template>
  <div class="nav-drawer"
		:class="{ 'nav-drawer--left': left }">
		<slot :toggleDrawer="toggleDrawer"></slot>

		<ul class="nav-drawer__container"
			:class="showDrawer ? 
        'nav-drawer__container--draw'
        : drawedOnce ? 'nav-drawer__container--recoil' : ''" 
      role="menu"
			ref="container"
		>
			<li v-for="(section, index) in sections" :key="index" 
				class="nav-drawer__link"
				:class="[`nav-drawer__link--${section.depth}`,
				{ 'nav-drawer__link--selected': activeSection === section.anchor.slice(1)}]"
				role="menuitem"
				@click="() => scrollTo(section.anchor)">
				<a href=""
					:tabindex="showDrawer ? 0 : -1"
				>
					{{section.depth === 1 ? 'Introduction' : section.value}}
				</a>
			</li>

			<div class="nav-drawer__actions">
				<button class="nav-drawer__btn" 
					@click="toggleDrawer"
					:tabindex="showDrawer ? 0 : -1"
				>
					<i class="nav-drawer__icon fa fa-close"></i>
				</button>
			</div>
		</ul>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { headerHeight } from '@/constants'

export default {
	name: 'NavDrawer',
	props: {
		left: Boolean
	},
  data: function() {
    return {
			showDrawer: false,
			drawedOnce: false
    }
	},
	computed: mapState(['sections', 'activeSection', 'windowWidth']),
  methods: {
    toggleDrawer() {
			if(!this.drawedOnce) this.drawedOnce = true
      this.showDrawer = !this.showDrawer
		},
		scrollTo(anchor) {
			const offset = this.$route.fullPath === '/' ? 60 : 
				this.windowWidth > 780 ? 40 : -20
			this.$store.dispatch('scrollPage', {
				destination: anchor.slice(1), 
				offset: headerHeight - offset, 
				duration: 900
			})
			this.showDrawer = false
		},
		scrollContainerToShowSelectedItem() {
			const itemEl = document.querySelector('.nav-drawer__link--selected')
			if(!itemEl) return
			
			const containerEl = this.$refs.container
			let scrollMod = (itemEl.getBoundingClientRect().top - containerEl.offsetTop 
				- containerEl.getBoundingClientRect().height/2)
			containerEl.scroll(0, containerEl.scrollTop + scrollMod, 0)
		}
	},
	watch: {
		activeSection() {
			this.scrollContainerToShowSelectedItem()
		},
		showDrawer(current) {
			if(current) {
				this.scrollContainerToShowSelectedItem()
			}
		}
	}
}
</script>

<style>
.nav-drawer__container {
	padding: 80px 50px 20px 50px;
	background-color: var(--bg-color);
	position: fixed;
	width: 80vw;
	max-width: 300px;
	height: 100vh;
	top: 0;
	right: -310px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-shadow: 1px 3px 5px rgb(0,0,0,0.4);
	margin: 0;
	overflow-y: scroll;
}

.nav-drawer--left .nav-drawer__container {
	right: auto;
	left: -310px;
}

.nav-drawer__container::-webkit-scrollbar {
  width: 10px;
}

.nav-drawer__container--draw {
  animation: draw 0.6s forwards;
}

.nav-drawer__container--recoil {
  animation: recoil 0.6s;
}

.nav-drawer--left .nav-drawer__container--draw {
  animation: drawLeft 0.6s forwards;
}

.nav-drawer--left .nav-drawer__container--recoil {
  animation: recoilLeft 0.6s;
}

@keyframes draw {
	0% {
		right: -310px
	}
	100% {
		right: -10px
	}
}
@keyframes recoil {
	0% {
		right: -10px
	}
	100% {
		right: -310px
	}
}

@keyframes drawLeft {
	0% {
		left: -310px
	}
	100% {
		left: -10px
	}
}
@keyframes recoilLeft {
	0% {
		left: -10px
	}
	100% {
		left: -310px
	}
}

.nav-drawer__actions {
	position: fixed;
	top: 0;
	padding: 10px 0;
	height: 60px;
	width: calc(80vw - 50px);
	max-width: 250px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.nav-drawer__actions::before {
	content: '';
	position: absolute;
	top: 0;
	left: -50px;
	padding: 10px 0;
	height: 60px;
	width: 80vw;
	max-width: 300px;
	background-color: var(--bg-color);
	border-bottom: 1px solid rgba(0,0,0,0.2);
}

.nav-drawer__btn {
	background-color: transparent;
	border: none;
	position: relative;
	top: 0;
	right: 20px;
}

body:not(.tab-user) .nav-drawer__btn:focus {
	outline: none;
}

.nav-drawer__icon.fa {	
	color: rgba(var(--dark-rgb), 0.7);
	font-size: 1.5rem;
}

.nav-drawer__link {
  list-style: none;
	padding: 0 0px;
	/* height: 50px; */
	color: var(--dark-color);
	cursor: pointer;
	font-weight: 500;
	font-size: 0.9em;
	display: flex;
	align-items: center;
	position: relative;
	text-align: left;
	text-transform: capitalize;
	margin-bottom: 10px;
}

.nav-drawer__link:hover {
	color: var(--main-color);
}

.nav-drawer__link--selected {
	color: var(--main-color);
  font-weight: bold;
}

.nav-drawer__link--selected::before {
  content: '\220E';
  /* content: '\2771'; */
  position: absolute;
  bottom: 2px;
  left: -15px;
	transform: scaleY(1.4) scaleX(0.8);
}

.nav-drawer__link--3 {
  padding-left: 20px;
}

.nav-drawer__link a {
	color: inherit;
}

body:not(.tab-user) a {
	outline: none;
}

@media(max-width: 780px) {
	.nav-drawer__link {
		margin-bottom: 20px;
	}
}

@media(max-width: 375px) {
	.nav-drawer__container {
		padding: 80px 30px 20px 30px;
	}

	.nav-drawer__actions::before { 
		left: -30px;
	}

	.nav-drawer__btn {
		right: 0px;
	}
}

</style>