<template>
	<header class="book-header metal linear" :class="{ 'not-cds': !isCdS }">
    <div v-if="isCdS" class="header-start">
      <div class="hilt-shadow"></div>
      <div class="incrusted-shadow"></div>
      <div class="outlet"></div>
      <div class="orb" ref="orb">
        <p class="orb-rune" ref="orbRune">o</p>
      </div>
      <div class="outlet-details"></div>
      <CdSNavbar />
    </div>
    <div class="sword-tip"></div>
	</header>
</template>

<script>

import CdSNavbar from './CdSNavbar'

export default {
  name: 'BookPageHeader',
  components: { CdSNavbar },
  computed: {
    isCdS() {
      return this.$route.fullPath === '/cavaleiro-de-sirius'
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.orb.classList.add('active')
    }, 3500)
    setTimeout(() => {
      this.$refs.orbRune.classList.add('active')
    }, 3300)
  }
}

</script>

<style>

.book-header {
	grid-area: header;
	position: fixed !important;
	width: 100%;
	z-index: 98;
  left: 10px;
  box-shadow: 2.4px 4.8px 3px -3px rgba(0,0,0,.4);

	display: flex;
	justify-content: space-between;
	align-items: center;

  animation-name: blade;
  animation-duration: 2.5s;
}

.book-header.not-cds {
  justify-content: flex-end;
}

.sword-tip {
  position: relative;
  left: 280px;
  overflow: hidden;
  height: 100px;
  width: 280px;
}

.sword-tip:before {
  content: ' ';
  position: absolute;
  height: 120px;
  width: 120px;
  left: -50px;
  top: -28px;
  z-index: 102;
  filter: drop-shadow(5px -2px 2px rgba(0,0,0,0.5));
  transform: rotate(148deg) skewX(40deg) skewY(22deg) scale(1.36);
  background-image: -webkit-repeating-linear-gradient(bottom left, hsla(0,0%,80%,0) 0%, hsla(0,0%,80%,0)   36%, hsla(0,0%,80%, .08) 10%),
    -webkit-repeating-linear-gradient(bottom left, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.03) 27%),
    -webkit-repeating-linear-gradient(bottom left, hsla(0,0%,80%,0) 0%, hsla(0,0%,80%,0) 7.2%, hsla(0,0%,80%,.05) 13.2%),
    
    linear-gradient(45deg, hsl(0,0%,68%)  0%, 
     hsl(0,0%,68%)  30%,
    hsl(0,0%,75%) 47%, 
    hsl(0,0%,80%) 48%, 
    hsl(0,0%,68%) 52%,
    hsl(0,0%,60%) 99%,
    hsl(0,0%,45%)100%);
}

.header-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  left: 252px;
}

.metal {
  position: relative;
  outline: none;
  background-color: hsl(0,0%,70%);
  transition: color .2s;
  height: 90px;
}

.metal.linear {
  width: 100%;
  background-image: -webkit-repeating-linear-gradient(bottom, hsla(0,0%,80%,0) 0%, hsla(0,0%,80%,0)   36%, hsla(0,0%,80%, .08) 10%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   24%, hsla(0,0%,  0%,.03) 27%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,80%,0) 0%, hsla(0,0%,80%,0) 7.2%, hsla(0,0%,80%,.05) 13.2%),
    
    linear-gradient(180deg, hsl(0,0%,68%)  0%, 
    hsl(0,0%,75%) 27%, 
    hsl(0,0%,80%) 27%, 
    hsl(0,0%,68%) 33%,
    hsl(0,0%,60%) 99%,
    hsl(0,0%,45%)100%);
}

.runes {
  display: flex;
  justify-content: space-around;
  align-items: center;

  position: relative;
  left: -84px;
  cursor: default;
}

.sword-rune {
  position: relative;
  top: 21px;
  left: 6px;
  font-family: "Rune";
  transform: rotate(0deg) scaleX(1);
  font-size: 30px;
  color: rgba(25, 82, 148, 0.3);
  text-shadow: 0.6px 0 0 rgba(25, 82, 148, 0.4),
  -0.6px 0 0 rgba(45, 126, 219, 0.3),
  0 0.6px 0 rgba(17, 57, 102, 0.4),
  0 -0.6px 0 rgba(45, 131, 230, 0.3);
  margin-right: 18px;
  padding: 1px 6px;
}

.orb-rune {
  position: relative;
  top: 27px;
  left: 6px;
  font-family: "Rune";
  transform: rotate(-30deg) skew(40deg,-20deg) scale(1.2,0.8);
  font-size: 36px;
  font-weight: bold;
  opacity: 0;
}

.orb-rune.active {
  color: rgb(82, 162, 253);
  text-shadow: 0.6px 0 6px rgba(31, 129, 241, 0.99),
  0.6px 0 12px rgba(40, 131, 236, 0.99),
  0.6px 0 18px rgba(23, 115, 219, 0.99),
  0.6px 0 24px rgba(30, 116, 214, 0.99);
  opacity: 0.4;

  animation-name: orbRune;
  animation-duration: 1.5s;
}

.orb-rune.blink {
  animation-name: orbRuneBlink;
  animation-duration: 1s;
}

.orb.active {
  background-color: #3177d3;
  box-shadow: inset -3px -4.8px 18px rgba(11, 45, 83, 0.4),
  inset -9px -12px 12px 0.12px rgba(7, 46, 90, 0.25),
  inset 12px 18px 24px 6px rgba(255,255,255,0.2),
  1.2px 1.8px 12px 4.8px rgba(39, 99, 211, 0.8),
  -1.2px 9px 12px rgba(0,0,0,.5);

  animation-name: orbGlow;
  animation-duration: 1s;
}

.orb.inactive {
  animation-name: orbDark;
  animation-duration: 0.6s;
}

.orb {
  position: relative;
  bottom: 18px;
  left: -124.2px;
  height: 102px;
  width: 102px;
  background-color: #134586;
  border-radius: 50%;
  box-shadow: inset 0 -6px 18px rgba(3, 21, 44, 0.6),
  inset -3px -12px 24px 12px rgba(3, 21, 44,0.4),
  inset -48px -48px 0 18px rgba(82, 157, 255, 0.2),
  1.2px 1.2px 3px rgba(0, 0, 0, 0.3),
  -1.2px 9px 12px rgba(0,0,0,.4);
  background-image: -webkit-linear-gradient(-45deg, rgba(255,255,220,.3) 0%, transparent 100%);
  background-image: -moz-linear-gradient(-45deg, rgba(255,255,220,.3) 0%, transparent 100%);  
  background-image: -o-linear-gradient(-45deg, rgba(255,255,220,.3) 0%, transparent 100%);
  background-image: -ms-linear-gradient(-45deg, rgba(255,255,220,.3) 0%, transparent 100%);
  background-image: linear-gradient(-45deg, rgba(255,255,220,.2) 0%, transparent 100%);
  z-index: 98;
}

.incrusted-shadow {
  position: relative;
  overflow: hidden;
  top: 26.8px;
  left: -40.2px;
  height: 36px;
  width: 52.2px;
}

.incrusted-shadow:before {
  position: absolute;
  content: ' ';
  left: -40.8px;
  top: -102.2px;
  transform: rotate(-60deg);
  height: 114px;
  width: 150px;
  border-radius: 50%;
  box-shadow: 0 6px 3px -3px rgba(0,0,0,.4);
}

.outlet {
  position: relative;
}

.outlet:before {
  display: block;
  position: absolute;
  content: ' ';
  left: -63.2px;
  top: -18.5px;
  border-bottom: 27px solid hsl(0,0%,80%);
  border-left: 36px solid transparent;
  border-right: 30px solid transparent;
  transform: rotate(-43deg);
  box-shadow: 1.8px 4.8px 3px -3px rgba(0,0,0,.4);
  z-index: 98;
}

.outlet:after {
  display: block;
  position: absolute;
  content: ' ';
  left: -61.2px;
  top: -45px;
  border-bottom: 27px solid hsl(0,0%,90%);
  border-left: 36px solid transparent;
  border-right: 30px solid transparent;
  transform: rotate(43deg) scale(-1);
  box-shadow: 1.2px 0.6px 2.4px rgba(0,0,0,.2);
  z-index: 98;
}

.outlet-details {
  position: relative;
}

.outlet-details:before {
  position: absolute;
  content: " ";
  height: 6px;
  width: 9px;
  background: rgba(0,0,0,.3);
  box-shadow: inset 0.6px 1.8px 3px rgba(0,0,0,.5);
  border-top-right-radius: 70%;
  border-bottom-right-radius: 70%;
  border-top-left-radius: 20%;
  border-bottom-left-radius: 20%;
  transform: rotate(-30deg);
  left: -121.2px;
  top: -12px;
  z-index: 99;
}

.outlet-details:after {
  position: absolute;
  content: " ";
  height: 5.4px;
  width: 9px;
  background: rgba(0,0,0,.15);
  box-shadow: inset 0.6px 1.8px 3px rgba(0,0,0,.5);
  border-top-right-radius: 70%;
  border-bottom-right-radius: 70%;
  border-top-left-radius: 20%;
  border-bottom-left-radius: 20%;
  transform: rotate(20deg);
  left: -120.6px;
  top: -30px;
  z-index: 99;
}

.hilt-shadow {
  position: relative;
  overflow: hidden;
  top: 27px;
  left: -12px;
  height: 36px;
  width: 42px;
}

.hilt-shadow:after {
  position: absolute;
  content: ' ';
  left: -12px;
  top: 15px; 
  height: 72px;
  width: 90px;
  border-radius: 50%;
  box-shadow: inset 24px 0 12px rgba(0,0,0,.5);
  transform: rotate(20deg)
}

@keyframes blade {
  0%{left: -120vw}
  10%{left: -120vw}
  100%{left:10px}
}

@keyframes orbRune {
  0%{opacity: 0}
  100%{opacity: 0.4}
}

@keyframes orbGlow {
  0% {
    background-color: #134586;
    box-shadow: inset 0 -6px 18px rgba(3, 21, 44, 0.6),
    inset -3px -12px 24px 12px rgba(3, 21, 44,0.4),
    inset -8vh -8vh 0 18px rgba(82, 157, 255, 0.2),
    1.2px 1.2px 3px rgba(0, 0, 0, 0.3),
    -1.2px 9px 12px rgba(0,0,0,.4);
  }
  100% {
    background-color: #3177d3;
    box-shadow: inset -3px -4.8px 18px rgba(11, 45, 83, 0.4),
    inset -9px -12px 12px 1.2px rgba(7, 46, 90, 0.25),
    inset 12px 18px 24px 6px rgba(255,255,255,0.2),
    1.2px 1.8px 12px 4.8px rgba(39, 99, 211, 0.8),
    -1.2px 9px 12px rgba(0,0,0,.5);
  }
}

@keyframes orbDark {
  0% {
    background-color: #3177d3;
    box-shadow: inset -3px -4.8px 18px rgba(11, 45, 83, 0.4),
    inset -9px -12px 12px 1.2px rgba(7, 46, 90, 0.25),
    inset 12px 18px 24px 6px rgba(255,255,255,0.2),
    1.2px 1.8px 12px 4.8px rgba(39, 99, 211, 0.8),
    -1.2px 9px 12px rgba(0,0,0,.5);
  }
  100% {
    background-color: #134586;
    box-shadow: inset 0 -6px 18px rgba(3, 21, 44, 0.6),
    inset -3px -12px 24px 12px rgba(3, 21, 44,0.4),
    inset -8vh -8vh 0 18px rgba(82, 157, 255, 0.2),
    1.2px 1.2px 3px rgba(0, 0, 0, 0.3),
    -1.2px 9px 12px rgba(0,0,0,.4);
  }
}

@keyframes fall {
  0%{top: -90px;}
  30%{top: -90px}
  100%{top:0px;}
}

@media(max-width: 740px) {
  .book-header {
    animation-name: fall;
  }
}
</style>