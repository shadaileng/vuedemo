<template>
  <div>
    <svg @mousemove="showPosition" id="container1" width="400" height="300">
      <polygon :points="points" style="fill:rgba(255, 0, 255, .7)"></polygon>
      <circle cx="100" cy="100" r="90" style="fill:rgba(1, 1, 1, .1);stroke:#f1f1f1"></circle>
    </svg>
    <div>{{ position }}</div>
  </div>
</template>

<script>
import TweenLite from '../../static/TweenLite.min.js'
export default {
  name: 'mySvg',
  data: function () {
    return {
      points: '',
      sides: 36,
      radius: 90,
      interval: null,
      position: ''
    }
  },
  methods: {
    generatePoints: function () {
      let beg = Math.random() * 360
      let angles = [beg]
      for (let i = 1, detal = 360 / this.sides; i < this.sides; i++) {
        angles.push(angles[i - 1] + detal >= 360 ? angles[i - 1] + detal - 360 : angles[i - 1] + detal)
      }
      let points = []
      let result = ''
      for (let i = 0, l = angles.length; i < l; i++) {
        let range = (Math.random() * 0.6 + 0.4) * this.radius
        let rad = angles[i] / 180 * Math.PI
        let x = (range * Math.cos(rad) + 100 + 0.5) | 0
        let y = (range * Math.sin(rad) + 100 + 0.5) | 0
        points.push({x: x, y: y})
        result += x + ',' + y + ' '
      }
      // console.log(result)
      return result
    },
    showPosition: function (event) {
      event = event || window.event
      let x = event.offsetX
      let y = event.offsetY
      this.position = '(' + x + ', ' + y + ')'
    }
  },
  mounted: function () {
    this.points = this.generatePoints()
    var vm = this
    this.interval = setInterval(() => {
      let p = vm.generatePoints()
      TweenLite.to(vm.$data, 600 / 1000, {points: p})
      // console.log(vm.points)
    }, 600)
  },
  destroyed: function () {
    clearInterval(this.interval)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container1 {
  border: 1px solid #efefef;
  border-radius: 5px;
}
</style>
