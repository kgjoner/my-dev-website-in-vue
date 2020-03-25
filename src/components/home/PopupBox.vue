<template>
  <div class="popup-bg" @click="e => close(e)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PopupBox",
  methods: {
    close(e) {
      if(e.target === document.getElementsByClassName('popup-bg')[0]) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style>
.popup-bg {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
</style>