<template>
  <div @mouseleave="nametoogle" @mousemove="nametoogle" @click="redirect" class="panel_view" :style="background">
    <p class="name_view" v-text="name"/>
  </div>
</template>

<script>
export default {
  name: 'ViewCom',
  props: ['backgroundImage', 'name', 'url'],
  data: function () {
    return {
      background: ''
    }
  },
  methods: {
    nametoogle: (event) => {
      event = event || window.event
      let el = event.currentTarget
      let elp = el.querySelector('p')
      let width = Number(el.offsetWidth)
      let height = Number(el.offsetHeight)
      let x = event.offsetX
      let y = event.offsetY
      if (x > 5 && x < width - 5 && y > 5 && y < height - 5) {
        // elp.style.height = elp.offsetHeight + 'px'
        el.style.cursor = 'pointer'
        elp.style.height = 'auto'
      } else {
        elp.style.height = '0%'
      }
    },
    redirect: function (event) {
      // console.log(this.url)
      window.open(this.url)
    }
  },
  mounted: function () {
    this.background = 'background-image: url(' + this.backgroundImage + ');'
    // console.log(this.background)
  },
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel_view {
  position: relative;
  float: left;
  width: 15%;
  height: 0;
  padding-bottom: 15%;
  margin: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  /*background-color: red;*/
  /*background-image: url('../assets/logo.png');*/
  background-size: cover;
  background-position: center;
}
.name_view {
  position: absolute;
  margin: 0;
  bottom: 0;
  width: 100%;
  height: 0%;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  overflow: hidden;
  color: #fff;
}
</style>
