<template>
  <div class="logo"
    :class="{ 'logo--light': light,
      'logo--dark': dark }" 
    @click="handleClick"
	>
    <div id="logo__background">
      <div v-for="(_, index) in new Array(10)" :key="index" 
        :class="`logo__bubble logo__bubble--${index + 1}`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    handleClick: Function,
    light: Boolean,
    dark: Boolean,
  }
}
</script>

<style>
.logo {
	height: 55px;
	width: 65px;
	color: var(--main-color);
	mask-image: url('../../assets/img/logo.svg');
  background-color: var(--main-color);
	mask-repeat: no-repeat;
	mask-size: 100% 100%;
	background: linear-gradient(to left, 
		rgba(var(--main-rgb), 0.6), rgba(var(--main-rgb), 0.75) 10%, rgba(var(--main-rgb), 0.9) 20%, 
		var(--main-color) 50%, rgba(var(--main-rgb), 0.9), rgba(var(--main-rgb), 0.8));
	/* background: linear-gradient(to left, #2fa4ce, #2498c2 5%, #28a5d3 10%, #2792b9 20%, 
		var(--main-color) 50%, #1f8bb3, #2ba3cf); */
	position: relative;
	cursor: pointer;
}

.logo::after {
	content: ' ';
	position: absolute;
	height: 55px;
	width: 70px;
	top: -5px;
	left: -7px;
	z-index: 3;
	background-color: rgba(255, 255, 255, .15);  
	backdrop-filter: blur(5px);
	opacity: 0.6;
}

.logo--light {
	background: #f2f2f299;
	border: none;
}

.logo--dark {
	background: rgba(0,0,0,0.2);
	border: none;
}

#logo__background {
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

.logo__bubble--1 {
    -webkit-animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 10s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 5%;
	top: 5%;
	
	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
}

.logo__bubble--2 {
    -webkit-animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 8s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 10%;
	top: 80%;
	
	-webkit-transform: scale(0.4);
	-moz-transform: scale(0.4);
	transform: scale(0.4);
}

.logo__bubble--3 {
    -webkit-animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 12s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 15%;
	top: 40%;
	
	-webkit-transform: scale(0.7);
	-moz-transform: scale(0.7);
	transform: scale(0.7);
}

.logo__bubble--4 {
    -webkit-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	-moz-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	
	left: 20%;
	top: 0;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

.logo__bubble--5 {
    -webkit-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 26%;
	top: 50%;
	
	-webkit-transform: scale(0.5);
	-moz-transform: scale(0.5);
	transform: scale(0.5);
}

.logo__bubble--6 {
    -webkit-animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 8.5s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 32%;
	top: 0;
	
	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
}

.logo__bubble--7 {
    -webkit-animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	-moz-animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	animation: animateBubble 8s linear infinite, sideWays 1s ease-in-out infinite alternate;
	
	left: 44%;
	top: 70%;
	
	-webkit-transform: scale(0.4);
	-moz-transform: scale(0.4);
	transform: scale(0.4);
}

.logo__bubble--8 {
    -webkit-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	-moz-animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	animation: animateBubble 9s linear infinite, sideWays 1.5s ease-in-out infinite alternate;
	
	left: 50%;
	top: 10%;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

.logo__bubble--9 {
    -webkit-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	-moz-animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	animation: animateBubble 14s linear infinite, sideWays 2s ease-in-out infinite alternate;
	
	left: 65%;
	top: 50%;
	
	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
}

.logo__bubble--10 {
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

.logo__bubble {
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

.logo__bubble:after {
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