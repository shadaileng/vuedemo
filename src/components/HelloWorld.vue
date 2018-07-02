<template>
  <div class="hello">
    <button @click="count++">{{ count }}</button>
    <button @click="show = !show">show</button>
    <transition name="fade_">
      <p v-if="show">show: ~~~~~~~~~~~~~~</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data: function () {
    return {
      count: 0,
      show: true
    }
  },
  watch: {
    show: function () {
      // console.log(this.show)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade_-enter-active {
  animation: fade_-in .5s;
}
.fade_-leave-active {
  animation: fade_-in .5s reverse;
}
@keyframes fade_-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
