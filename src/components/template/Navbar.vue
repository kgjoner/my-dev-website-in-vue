<template>
	<ul class="navbar" :class="{'transparent-header': isHeaderTransparent}">
		<li v-show="windowWidth > 780" kg-ref="cover" @click="e => scrollIt(e, sectionsElements[0], headerHeight)">
			<div id="background-wrap" class="stamp-box">
				<!-- <h1>KG</h1> -->
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
				<!-- <img class="stamp" v-if="isHeaderTransparent" :src="whiteStamp" alt="selo">
				<img class="stamp" v-else :src="stamp" alt="selo"> -->
			</div>
		</li>
		<li v-show="windowWidth > 780 || (activeSection == 'presentation' && windowWidth >= 450)"
			kg-ref="presentation" @click="e => scrollIt(e, sectionsElements[1], headerHeight-50)">Presentation</li>
		<li v-show="windowWidth > 780 || (activeSection == 'projects' && windowWidth >= 450)"  
			kg-ref="projects" @click="e => scrollIt(e, sectionsElements[2], (headerHeight))">Projects</li>
		<li v-show="windowWidth > 780 || (activeSection == 'contact' && windowWidth >= 450)"  
			kg-ref="contact" @click="e => scrollIt(e, sectionsElements[3], (headerHeight+20))">Contact</li>
		<button v-show="windowWidth <= 780" class="dropdown-button" :class="{'white-version': isHeaderTransparent}" @click="toggleDropdown">
			<!-- <fa class="menu-icon" :icon="fas.faBars"></fa> -->
		</button>
		<div v-show="showDropdown && windowWidth <= 780" class="dropdown">
			<li @click="e => scrollIt(e, sectionsElements[1], headerHeight-100)">Presentation</li>
			<li @click="e => scrollIt(e, sectionsElements[2], (headerHeight-20))">Projects</li>
			<li @click="e => scrollIt(e, sectionsElements[3], (headerHeight-110))">Contact</li>
		</div>
	</ul>
</template>

<script>
import { fas } from '@fortawesome/free-solid-svg-icons'

export default {
	nome: 'Navbar',
	data: function() {
			return {
					headerHeight: 60,
					windowWidth: null,
					activeSection: "presentation",
					monitorActiveSection: true,
					isHeaderTransparent: true,
					showDropdown: false,
			}
	},
	computed: {
			sectionsElements(){
					return [ 
							document.getElementById('cover'),
							document.getElementById('presentation'),
							document.getElementById('projects'),
							document.getElementById('contact')
					]
			},
			sectionsLastToFirst() {
					const sectionsElements = [...this.sectionsElements]
					return sectionsElements.sort((a, b) => b.offsetTop - a.offsetTop)
			},
			fas() {
					return fas
			}
	},
	methods: {
		scrollIt(e, destination, offset = 0, duration = 900) {
			e.preventDefault()
			this.monitorActiveSection = false
			this.updateActiveSection(destination.id)
			if(this.showDropdown) this.toggleDropdown()

			let start = window.pageYOffset;
			const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
			const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			const destinationOffset = destination.offsetTop;
			let destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
			const vueComp = this
			function scroll() {
				const now = 'now' in window.performance ? performance.now() : new Date().getTime();
				const time = Math.min(1, ((now - startTime) / duration));
				if(destinationOffsetToScroll > start) {
					window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
					if(Math.ceil(window.scrollY) < (destinationOffsetToScroll - offset)) {
						window.requestAnimationFrame(scroll);
					} else {
						vueComp.monitorActiveSection = true;
					}
				} else {
					window.scroll(0, Math.ceil((time * (destinationOffsetToScroll - start - offset)) + start));
					if((Math.ceil(window.scrollY) > (destinationOffsetToScroll - offset)) &&
						window.scrollY !== 0) {
						window.requestAnimationFrame(scroll);
					} else {
						vueComp.monitorActiveSection = true;
					}
				}
			}
			window.requestAnimationFrame(scroll)
		},
		monitorScroll() {
			if(this.monitorActiveSection && window.scrollY > 50) {
				this.checkActiveSection()
			}
			if(window.scrollY > 50 && this.isHeaderTransparent) {
				this.isHeaderTransparent = false
				this.$emit('changeHeader', false)
				if(this.monitorActiveSection) {
						this.updateActiveSection("presentation")
				}
			} else if(window.scrollY <= 50 && !this.isHeaderTransparent) {
				this.isHeaderTransparent = true
				this.$emit('changeHeader', true)
				document.querySelectorAll('[kg-ref="presentation"]')[0].classList.remove('active')
			}
		},
		checkActiveSection() {
			let currentActiveSection = null
			this.sectionsLastToFirst.some(section => {
					if(section.offsetTop <= (window.scrollY + this.headerHeight + 50)) {
					currentActiveSection = section
					return true
				}
			})
			if(currentActiveSection.id !== this.activeSection) {
				const correctedActiveSection = currentActiveSection.id == "cover" ? "presentation" : currentActiveSection.id
				this.updateActiveSection(correctedActiveSection)
			}
		},
		updateActiveSection(newSection) {
			document.querySelectorAll(`[kg-ref="${this.activeSection}"]`)[0].classList.remove('active')
			document.querySelectorAll(`[kg-ref="${newSection}"]`)[0].classList.add('active')
			this.activeSection = newSection;
		},
		toggleDropdown() {
			this.showDropdown = !this.showDropdown;
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

header .navbar {
	display: flex;
	align-items: flex-end;
	user-select: none;
	font-family: 'B612 Mono';
	padding: 0px;
	position: absolute;
	height: 60px;
	margin: 0;
	bottom: 0;
}

.navbar li {
	list-style-type: none;
	padding: 16px 20px 10px;
	height: 50px;
	color: var(--dark-color);
	cursor: pointer;
	font-weight: 500;
	font-size: 0.9em;
	position: relative;
	left: calc(100vw - 440px);
}

.navbar li[kg-ref="cover"] {
	top: 0;
	left: 0;
}

.navbar.transparent-header li {
	color: var(--bg-color);
}

.navbar li .stamp-box {
	position: absolute;
	height: 55px;
	width: 80px;
	top: -7.5px;
	left: 5px;
	padding-top: 10px;
	color: var(--main-color);
	mask-image: url('../../assets/img/logo.svg');
  background-color: var(--main-color);
	mask-repeat: no-repeat;
	mask-size: 100% 100%;
	background: linear-gradient(to left, #2fa4ce, #2498c2 5%, #28a5d3 10%, #2792b9 20%, 
		var(--main-color) 50%, #1f8bb3, #2ba3cf);
	/* animation: liquid 0.5s alternate infinite; */
}

@keyframes liquid {
	0%{ 
		background: linear-gradient(to left, #2fa4ce, #2498c2 5%, #28a5d3 10%, #2792b9 20%, 
		var(--main-color) 50%, #1f8bb3, #2ba3cf)
	}
	50% {
		background: linear-gradient(to left, #2fa4ce, #2498c2 10%, #28a5d3 15%, #2792b9 40%, 
		var(--main-color) 60%, #1f8bb3, #2ba3cf)
	}
	100% {
		background: linear-gradient(to left, #2fa4ce, #2498c2 8%, #28a5d3 12%, #2792b9 30%, 
		var(--main-color) 55%, #1f8bb3, #2ba3cf)
	}
}

.navbar li .stamp-box::after {
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

.navbar.transparent-header li .stamp-box {
	background: #f2f2f299;
	border: none;
}

.navbar li .stamp {
	height: 40px;
	position: relative;
	left: -40px;
}

.navbar li:not([kg-ref="cover"])::after {
	content: ' ';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	border-bottom: 3px solid var(--main-color);
}

.navbar.transparent-header li:not([kg-ref="cover"])::after {
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
	border: 2px solid var(--dark-neutral);
	border-radius: 5px;
	height: 40px;
	width: 40px;
	color: #fcfcfc;
	outline: none;
	cursor: pointer;
}

.navbar .dropdown-button .menu-icon {
	color: var(--dark-neutral)
}

.navbar .dropdown-button.white-version {
	border: 2px solid var(--bg-color);
}

.navbar .dropdown-button.white-version .menu-icon {
	color: var(--bg-color)
}

.navbar .dropdown-button:hover {
	border: 2px solid var(--main-green);
}

.navbar .dropdown-button:hover .menu-icon {
	color: var(--main-green)
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
}

@media(max-width: 780px) {
	.navbar {
		flex-direction: row-reverse;
	}

	.navbar li {
		top: 3px;
		left: 10px;
	}
}

@media(max-width: 520px) {
	.navbar {
		margin-left: 0;
		padding-left: 0;
		padding-right: 0;
	}

	.navbar .dropdown {
		padding-right: 50px;
	}
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
