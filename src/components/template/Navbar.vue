<template>
	<nav class="navbar" :class="{'transparent-header': isHeaderTransparent}">
		<div class="logo-box" kg-ref="cover" @click="e => scrollIt(e, sectionsElements[0], headerHeight)">
			<div id="background-wrap">
				<div class="bubble x1"></div>
				<div class="bubble x2"></div>
				<div class="bubble x3"></div>
				<div class="bubble x4"></div>
				<div class="bubble x5"></div>
				<div class="bubble x6"></div>
				<div class="bubble x7"></div>
				<div class="bubble x8"></div>
				<div class="bubble x9"></div>
				<div class="bubble x10"></div>
			</div>
		</div>
		<ul class="menu">
			<li v-show="windowWidth > 780 || (activeSection == 'presentation' && windowWidth >= 450)"
				kg-ref="presentation" @click="e => scrollIt(e, sectionsElements[1], headerHeight-50)">Presentation</li>
			<li v-show="windowWidth > 780 || (activeSection == 'projects' && windowWidth >= 450)"  
				kg-ref="projects" @click="e => scrollIt(e, sectionsElements[2], (headerHeight))">Projects</li>
			<li v-show="windowWidth > 780 || (activeSection == 'contact' && windowWidth >= 450)"  
				kg-ref="contact" @click="e => scrollIt(e, sectionsElements[3], (headerHeight+20))">Contact</li>
		</ul>
		<button v-show="windowWidth <= 780" class="dropdown-button" :class="{'white-version': isHeaderTransparent}" @click="toggleDropdown">
			<i class="menu-icon fa fa-bars"></i>
		</button>
		<ul v-show="showDropdown && windowWidth <= 780" class="dropdown">
			<li @click="e => scrollIt(e, sectionsElements[1], headerHeight-100)">Presentation</li>
			<li @click="e => scrollIt(e, sectionsElements[2], (headerHeight-20))">Projects</li>
			<li @click="e => scrollIt(e, sectionsElements[3], (headerHeight-110))">Contact</li>
		</ul>
	</nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
	nome: 'Navbar',
	data: function() {
		return {
			windowWidth: null,
			showDropdown: false,
		}
	},
	computed: {
		...mapState({
			headerHeight: state => state.headerHeight,
			isHeaderTransparent: state => state.isHeaderTransparent,
			monitorActiveSection: state => state.monitorActiveSection,
			activeSection: state => state.activeSection,
			sectionsElements: state => {
				return state.sections.map(section => {
					return document.getElementById(section)
				})
			},
		}),
		sectionsElementsLastToFirst() {
			const sectionsElements = [...this.sectionsElements]
			return sectionsElements.sort((a, b) => b.offsetTop - a.offsetTop)
		},
	},
	methods: {
		scrollIt(e, destination, offset = 0, duration = 900) {
			e.preventDefault()
			if(this.showDropdown) this.toggleDropdown()

			this.$store.dispatch('scrollPage', {destination, offset, duration})
		},

		monitorScroll() {
			this.$store.dispatch('monitorScroll', this.sectionsElementsLastToFirst)
		},

		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
		}
	},
	watch: {
		activeSection(newSection, oldSection) {
			document.querySelectorAll(`[kg-ref="${oldSection}"]`)[0].classList.remove('active')
			document.querySelectorAll(`[kg-ref="${newSection}"]`)[0].classList.add('active')
		}
	},
	mounted() {
		const headerEl = document.getElementsByClassName('header')[0]
		this.headerHeight = headerEl.offsetHeight
		this.windowWidth = window.innerWidth
		window.addEventListener("scroll", this.monitorScroll)
		window.addEventListener("resize", () => this.windowWidth = window.innerWidth)
	}

}
</script>

<style>

nav.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	font-family: 'B612 Mono';
	padding: 0px 25px 0 10px;
	height: 60px;
	width: 100vw;
}

.navbar .logo-box {
	height: 55px;
	width: 80px;
	color: var(--main-color);
	mask-image: url('../../assets/img/logo.svg');
  background-color: var(--main-color);
	mask-repeat: no-repeat;
	mask-size: 100% 100%;
	background: linear-gradient(to left, #2fa4ce, #2498c2 5%, #28a5d3 10%, #2792b9 20%, 
		var(--main-color) 50%, #1f8bb3, #2ba3cf);
	position: relative;
	cursor: pointer;
}

.navbar .logo-box::after {
	content: ' ';
	position: absolute;
	height: 55px;
	width: 80px;
	top: -5px;
	left: -7px;
	z-index: 3;
	background-color: rgba(255, 255, 255, .15);  
	backdrop-filter: blur(5px);
	opacity: 0.6;
}

.navbar.transparent-header .logo-box {
	background: #f2f2f299;
	border: none;
}

.navbar .menu {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-bottom: 0;
	height: 60px;
}

.navbar .menu li,
.navbar .dropdown li {
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
}

.navbar.transparent-header li {
	color: var(--bg-color);
}

.navbar li::after {
	content: ' ';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	border-bottom: 3px solid var(--main-color);
}

.navbar.transparent-header li::after {
	border-bottom: 1px solid var(--bg-color);
}

.navbar li:hover::after {
	width: 100%;
	left: 0;
	transition: 0.5s;
}

.navbar li.active:not([kg-ref="cover"])::after {
	width: 100%;
	left: 0;
	border-bottom: 3px solid var(--main-color);
	color: var(--dark-color);
}

.navbar a:hover {
	text-decoration: none;
}

.navbar .dropdown-button {
	background-color: transparent;
	border: 2px solid rgba(var(--dark-rgb), 0.8);
	border-radius: 5px;
	height: 40px;
	width: 40px;
	color: #fcfcfc;
	outline: none;
	cursor: pointer;
}

.navbar .dropdown-button:hover,
.navbar .dropdown-button.white-version:hover {
	border-color: var(--main-color);
}

.navbar .dropdown-button.white-version {
	border-color: var(--bg-color);
}

.navbar .dropdown-button .menu-icon {
	color: rgba(var(--dark-rgb), 0.8);
}

.navbar .dropdown-button.white-version .menu-icon {
	color: var(--bg-color);
}

.navbar .dropdown-button .menu-icon:hover,
.navbar .dropdown-button.white-version .menu-icon:hover,
.navbar .dropdown-button:hover .menu-icon {
	color: var(--main-color);
}

.navbar .dropdown {
	padding: 20px 50px;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	top: 60px;
	left: 0;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-shadow: 1px 3px 5px rgb(0,0,0,0.4)
}

.navbar .dropdown li {
	margin-bottom: 10px;
	color: #fff;
	list-style: none;
}


#background-wrap {
	z-index: -1;
	overflow: hidden;
}

/* KEYFRAMES */

@-webkit-keyframes animateBubble {
    0% {
        margin-top: 200px;
    }
    100% {
        margin-top: -100%;
    }
}

@-moz-keyframes animateBubble {
    0% {
        margin-top: 200px;
    }
    100% {
        margin-top: -100%;
    }
}

@keyframes animateBubble {
    0% {
        margin-top: 200px;
    }
    100% {
        margin-top: -100%;
    }
}

@-webkit-keyframes sideWays { 
    0% { 
        margin-left:0px;
    }
    100% { 
        margin-left:10px;
    }
}

@-moz-keyframes sideWays { 
    0% { 
        margin-left:0px;
    }
    100% { 
        margin-left:10px;
    }
}

@keyframes sideWays { 
    0% { 
        margin-left:0px;
    }
    100% { 
        margin-left:10px;
    }
}

/* ANIMATIONS */

.x1 {
    -webkit-animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 5%;
	top: 5%;
	
	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
}

.x2 {
    -webkit-animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 10%;
	top: 80%;
	
	-webkit-transform: scale(0.4);
	-moz-transform: scale(0.4);
	transform: scale(0.4);
}

.x3 {
    -webkit-animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 15%;
	top: 40%;
	
	-webkit-transform: scale(0.7);
	-moz-transform: scale(0.7);
	transform: scale(0.7);
}

.x4 {
    -webkit-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	-moz-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	
	left: 20%;
	top: 0;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

.x5 {
    -webkit-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 26%;
	top: 50%;
	
	-webkit-transform: scale(0.5);
	-moz-transform: scale(0.5);
	transform: scale(0.5);
}

.x6 {
    -webkit-animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 32%;
	top: 0;
	
	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
}

.x7 {
    -webkit-animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 44%;
	top: 70%;
	
	-webkit-transform: scale(0.4);
	-moz-transform: scale(0.4);
	transform: scale(0.4);
}

.x8 {
    -webkit-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	-moz-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	
	left: 50%;
	top: 10%;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

.x9 {
    -webkit-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 65%;
	top: 50%;
	
	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
}

.x10 {
    -webkit-animation: animateBubble 10.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 10.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 10.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 80%;
	top: 80%;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

/* OBJECTS */

.bubble {
  -webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2), inset 0px 1.5px 9px 0.75px rgba(230, 248, 255, 0.8);
	-moz-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2), inset 0px 1.5px 9px 0.75px rgba(230, 248, 255, 0.8);
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2), inset 0px 1.5px 9px 0.75px rgba(230, 248, 255, 0.8);
	
  height: 30px;
	position: absolute;
	width: 30px;
}

.bubble:after {
    background: -moz-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%); /* FF3.6+ */
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,0.5)), color-stop(70%,rgba(255,255,255,0))); /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Opera 12+ */
    background: -ms-radial-gradient(center, ellipse cover,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* IE10+ */
    background: radial-gradient(ellipse at center,  rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
	
    -webkit-box-shadow: inset 0 3px 4.5px rgba(230, 248, 255, 0.3);
	-moz-box-shadow: inset 0 3px 4.5px rgba(230, 248, 255, 0.3);
	box-shadow: inset 0 3px 4.5px rgba(230, 248, 255, 0.3);
	
	content: "";
  height: 27px;
	left: 5px;
	position: absolute;
	width: 27px;
}
</style>
