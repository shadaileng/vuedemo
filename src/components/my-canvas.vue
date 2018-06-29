<template>
  <div @selectstart.prevent>
    <canvas @mousedown="markposition" @mouseup="releaseposition" @mouseleave="releaseposition" @mousemove="showPosition" id="container" :width="width" :height="height"></canvas>
    <div>{{ '(' + position.x + ', ' + position.y +')' }}</div>
  </div>
</template>

<script>
export default {
  name: 'myCanvas',
  data: function () {
    return {
      ctx: null,
      width: 400,
      height: 300,
      position: {x: -1, y: -1},
      mouseMark: false,
      obj: [{position: {x: 200, y: 150}}, {position: {x: 200, y: 150}}, {position: {x: 200, y: 150}}, {position: {x: 200, y: 150}}, {position: {x: 200, y: 150}}, {position: {x: 200, y: 150}}],
      interval: null
    }
  },
  mounted: function () {
    console.log('mounted')
    this.init()
  },
  updated: function () {
    // console.log('updated')
    this.init()
  },
  methods: {
    init: function () {
      let container = $('#container')
      container.width = this.width
      container.height = this.height
      // container.mousemove(this.render)
      this.ctx = container[0].getContext('2d')
      this.render({offsetX: -10, offsetY: -10})
      if (this.interval) {
        clearInterval(this.interval)
      }
      // requestAnimationFrame(this.render)
      var vm = this
      this.interval = setInterval(() => {
        vm.render()
      }, 60 / 1000)
    },
    render: function () {
      let ctx = this.ctx
      let width = this.width
      let height = this.height
      ctx.clearRect(0, 0, width, height)
      // event = event = event || window.event
      let x = this.position.x
      let y = this.position.y
      ctx.beginPath()
      let geomotrys = [
        [
          [10, 10], [10, 30], [15, 30], [15, 10], [10, 10],
          [25, 10], [25, 30], [30, 30], [30, 10], [25, 10]
        ]
      ]
      let fill = true
      let topObj = -1
      for (let i = 0, l = geomotrys.length; i < l; i++) {
        let geo = geomotrys[i]
        let points = geo.map((points) => { return {x: points[0], y: points[1]} })
        let style = this.draw(points, x, y, fill)
        if (topObj < 0 && style) {
          topObj = i
        }
      }
      if (topObj >= 0) {
        let geo = geomotrys[topObj]
        let points = geo.map((points) => { return {x: points[0], y: points[1]} })
        this.draw(points, x, y, fill, true)
      }
      topObj = -1
      for (let i = this.obj.length - 1; i >= 0; i--) {
        let position = this.obj[i].position
        if (i === 0) {
          if (this.mouseMark) {
            position = this.close2obj(position, this.position)
          } else {
            // let detalX = position.x + (Math.random() * 20 - 10) * 10
            // let detalY = position.y + (Math.random() * 20 - 10) * 10
            let detalX = 200
            let detalY = 150
            position = this.close2obj(position, {x: detalX, y: detalY})
          }
        } else {
          position = this.close2obj(position, this.obj[i - 1].position)
        }
        this.obj[i].position = position

        let gradient = ctx.createRadialGradient(position.x, position.y, 1, position.x, position.y, 10)
        ctx.fillStyle = gradient
        gradient.addColorStop(0, '#8ac')
        gradient.addColorStop(1, '#afd')
        // gradient.addColorStop(1, 'red')
        ctx.beginPath()
        ctx.arc(this.obj[i].position.x, this.obj[i].position.y, 10, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    draw: function (points, x, y, fill, top) {
      let ctx = this.ctx
      let style = '#fff'
      ctx.beginPath()
      if (fill) {
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1, l = points.length; i < l; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.closePath()
        style = top && ctx.isPointInPath(x, y) ? '#f00' : '#000'
        ctx.fillStyle = style
        ctx.fill()
      } else {
        ctx.lineWidth = 2
        for (let i = 1, l = points.length; i < l; i++) {
          this.line(points[i], points[i - 1])
          this.point(points[i])
        }
        ctx.closePath()
        style = top && ctx.isPointInPath(x, y) ? '#f00' : '#000'
        // ctx.strokeStyle = style
        // ctx.stroke()
        ctx.fillStyle = style
        ctx.fill()
      }
      return ctx.isPointInPath(x, y)
    },
    line: function (start, end) {
      let ctx = this.ctx

      let distance = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
      let dx = start.x - end.x
      let dy = start.y - end.y
      let sina = Math.abs(dx) / distance
      let cosa = Math.abs(dy) / distance
      let r = 1
      let b = -1

      if (dx * dy < 0) {
        b *= -1
      }
      let start1 = {x: start.x + r * cosa, y: start.y + r * sina * b}
      let start2 = {x: start.x - r * cosa, y: start.y - r * sina * b}
      ctx.moveTo(this.fixint(start1.x), this.fixint(start1.y))
      ctx.lineTo(this.fixint(start2.x), this.fixint(start2.y))
      ctx.lineTo(this.fixint(start2.x - dx), this.fixint(start2.y - dy))
      ctx.lineTo(this.fixint(start1.x - dx), this.fixint(start1.y - dy))
      ctx.lineTo(this.fixint(start1.x), this.fixint(start1.y))
      // ctx.fillText('(' + (start1.x) + ', ' + (start1.y) + ')', (start1.x), (start1.y))
      // ctx.fillText('(' + (start2.x) + ', ' + (start2.y) + ')', (start2.x), (start2.y))
      // ctx.fillText('(' + (start2.x - dx) + ', ' + (start2.y - dy) + ')', (start2.x - dx), (start2.y - dy))
      // ctx.fillText('(' + (start1.x - dx) + ', ' + (start1.y - dy) + ')', (start1.x - dx), (start1.y - dy))
    },
    point: function (point) {
      let ctx = this.ctx
      ctx.arc(this.fixint(point.x), this.fixint(point.y), 2, 0, Math.PI * 2)
    },
    fixint: function (num) {
      return (0.5 + num) | 0
      // return ~~(0.5 + num)
      // return (0.5 + num) << 0
    },
    close2obj: function (position, position_) {
      // let speed = 0.5
      // if (x2 > x1) {
      //   x1 += speed
      // } else if (x2 < x1) {
      //   x1 -= speed
      // }
      // if (y2 > y1) {
      //   y1 += speed
      // } else if (y2 < y1) {
      //   y1 -= speed
      // }
      let effect = 0.03

      position.x += (position_.x - position.x) * effect
      position.y += (position_.y - position.y) * effect
      return position
    },
    markposition: function () {
      this.mouseMark = true
    },
    releaseposition: function () {
      this.mouseMark = false
    },
    showPosition: function (event) {
      event = event || window.event
      let x = event.offsetX
      let y = event.offsetY
      this.position = {x: x, y: y}
    }
  },
  beforeCreate: () => {
    console.log('beforeCreate')
  },
  created: () => {
    console.log('created')
  },
  beforeMount: () => {
    console.log('beforeMount')
  },
  // mounted: () => {
  //   console.log('mounted')
  // },
  beforeUpdate: () => {
    // console.log('beforeUpdate')
  },
  // updated: () => {
  //   console.log('updated')
  // },
  activated: () => {
    console.log('activated')
  },
  deactivated: () => {
    console.log('deactivated')
  },
  beforeDestroy: () => {
    console.log('beforeDestroy ')
  },
  destroyed: () => {
    console.log('destroyed ')
  }
}
</script>
<style>
  #container {
    width: 400px;
    height: 300px;
    border: 1px solid #a0a0a0;
    border-radius: 5px;
  }
  #container:hover {
    cursor: pointer;
  }
</style>
