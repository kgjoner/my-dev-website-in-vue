<template>
  <div class="slider" :style="`width:${totalWidth}; height:${totalHeight}`">
    <div class="slider__container">
      <div class="slider__retainer" :style="`width:calc(${contentWidth} + 50px)`">
        <ul class="slider__content-list" ref="contentList">
          <li v-for="(content, index) in currentContent" ref="content"
            :key="index"
            :style="`width:${contentWidth}`"  
          >
            <img :src="content" alt=""
              :class="{'ficcionados': content === listOfContent[0]}">
          </li>
        </ul>
      </div>
    </div>

    <div class="slider__frame" :style="`width:calc(${contentWidth} + 130px); height:${totalHeight}`">
      <button @click="previousContent" class="slider__btn">
        <div class="icon arrow-left"></div>
      </button>
      <button @click="nextContent" class="slider__btn">
        <div class="icon arrow-right"></div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Slider',
  props: {
    listOfContent: Array,
    totalWidth: {
      type: String,
      default: '100%',
    },
    totalHeight: {
      type: String,
      default: '90vh'
    },
    contentWidth: {
      type: String,
      default: '80%',
    },
    transitionDuration: {
      type: Number,
      default: 400
    }
  },
  data: function() {
    return {
      selectedIndex: 0,
      isSliding: false,
    }
  },
  computed: {
    ...mapState({
      windowWidth: state => state.windowWidth
    }),
    nextIndex() {
      let nextIndex = this.selectedIndex + 1
      if(nextIndex > this.listOfContent.length - 1) nextIndex = 0
      return nextIndex
    },
    previousIndex() {
      let previousIndex = this.selectedIndex - 1
      if(previousIndex < 0) previousIndex = this.listOfContent.length - 1
      return previousIndex
    },
    currentContent() {
      const adjacentIndexes = [
        this.previousIndex,
        this.selectedIndex,
        this.nextIndex
      ]
      return adjacentIndexes.map(i => this.listOfContent[i])
    },
    contentWidthInPx() {
      const width = this.windowWidth //make it update when windowWidth changes
      return window.getComputedStyle(this.$refs.content[0]).width
    },
  },
  methods: {
    nextContent() {
      if(this.isSliding) return
      this.slideContent(-1)
      this.$emit('contentChange', this.nextIndex)
    },

    previousContent() {
      if(this.isSliding) return
      this.slideContent(1)
      this.$emit('contentChange', this.previousIndex)
    },

    slideContent(signal) {
      this.isSliding = true
      const duration = this.transitionDuration;
      const target = parseInt(this.contentWidthInPx) + 40;
      let start = 0;

      const vm = this
      function slide(timestamp) {
        if(!start) start = timestamp
        const pos = target*(timestamp - start)/duration
        if(pos <= target) {
          vm.$refs.contentList.style.left = `${signal*pos}px`
          requestAnimationFrame(slide)
        } else {
          vm.$refs.contentList.style.left = `0px`
          vm.selectedIndex = signal < 0 ? vm.nextIndex : vm.previousIndex
          vm.isSliding = false
        }
      }

      requestAnimationFrame(slide)
    },
  }
}
</script>

<style>
.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.slider--shadow::after {
  content: '';
  position: absolute;
  top: 40px;
  left: -40%;
  width: 180%;
  height: 100px;
  background: rgba(254, 254, 254, 1);
}

.slider__container {
  width: 100%;
  height: 100%;
  padding: 0 50px;
  position: relative;
  display: flex;
  justify-content: center;
}

.slider--shadow .slider__container {
  margin-top: 60px;
  background-color: rgba(253, 253, 253, 0.6);
  box-shadow: 0 40px 40px 5px rgb(185, 215, 233);
}

.slider__retainer {
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.slider__content-list {
  position: relative;
  top: 0px;
  padding: 0;
  margin: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}

.slider--shadow .slider__content-list {
  background: rgba(253, 253, 253, 0.6);
}

.slider__content-list li {
  margin: 0 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slider__content-list img {
  max-width: 100%;
  max-height: 100%;
}

img.ficcionados {
  background-color: #1d7fd8;
  border-radius: 5px;
}

.slider__frame {
  position: absolute;
  height: 100%;
  max-width: calc(100% - 15px);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.slider--shadow .slider__frame {
  margin-top: 45px;
}

.slider__btn {
  height: 30px;
  width: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 2px solid rgb(185, 215, 233);
  outline: none;
  padding: 0;
  transform: scale(1.2);
  opacity: 0.8;
  transition: 0.5s;
}

.slider__btn:hover {
  border-color: var(--main-color);
}

.icon {
  mask-image: url('../../assets/img/arrow.svg');
  background-color: rgb(185, 215, 233);
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: 50% 50%;
  height: 27px;
  width: 27px;
  transition: 0.5s;
}

.slider__btn:hover .icon {
  background-color: var(--main-color);
}

.arrow-left {
  transform: rotate(90deg);
}

.arrow-right {
  transform: rotate(-90deg);
}
</style>