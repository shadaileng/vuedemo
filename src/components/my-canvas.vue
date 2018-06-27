<template>
  <div>
    <canvas id="container" width="400px" height="300px"></canvas>
  </div>
</template>

<script>
export default {
  name: 'myCanvas',
  data: function () {
    return {
      ctx: null,
      width: 400,
      height: 300
    }
  },
  mounted: function () {
    console.log('mounted')
    this.init()
  },
  updated: function () {
    console.log('updated')
    this.init()
  },
  methods: {
    init: function () {
      let container = $('#container')
      container.width = this.width
      container.height = this.height
      container.mousemove(this.render)
      this.ctx = container[0].getContext('2d')
      this.render({offsetX: -10, offsetY: -10})
    },
    render: function (event) {
      let ctx = this.ctx
      let width = this.width
      let height = this.height
      ctx.clearRect(0, 0, width, height)
      event = event = event || window.event
      let x = event.offsetX
      let y = event.offsetY
      ctx.beginPath()
      let geomotrys = [
        // [
        //   [0, 0], [0, 50], [50, 50], [50, 0], [0, 0]
        // ],
        // [
        //   [100, 50], [100, 150], [150, 125], [100, 50]
        // ],
        // [
        //   [80, 80], [80, 100], [200, 100], [200, 80], [80, 80]
        // ]
        [
          [10, 270], [350, 270]
        ],
        [
          [20, 10], [20, 280]
        ],
        [
          [30, 260], [50, 200], [70, 180], [90, 160], [110, 170], [130, 160], [150, 150], [170, 145], [190, 140], [210, 135], [230, 120], [250, 100], [270, 80, [290, 50], [310, 20]]
        ]
      ]
      let fill = false
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
        style = top && ctx.isPointInPath(x, y) ? '#f00' : '#000'
        ctx.fillStyle = style
        ctx.fill()
      } else {
        ctx.lineWidth = 2
        for (let i = 1, l = points.length; i < l; i++) {
          this.line(points[i], points[i - 1])
          this.point(points[i])
        }
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
      ctx.moveTo((start1.x), (start1.y))
      ctx.lineTo((start2.x), (start2.y))
      ctx.lineTo((start2.x - dx), (start2.y - dy))
      ctx.lineTo((start1.x - dx), (start1.y - dy))
      ctx.lineTo((start1.x), (start1.y))
      // ctx.fillText('(' + (start1.x) + ', ' + (start1.y) + ')', (start1.x), (start1.y))
      // ctx.fillText('(' + (start2.x) + ', ' + (start2.y) + ')', (start2.x), (start2.y))
      // ctx.fillText('(' + (start2.x - dx) + ', ' + (start2.y - dy) + ')', (start2.x - dx), (start2.y - dy))
      // ctx.fillText('(' + (start1.x - dx) + ', ' + (start1.y - dy) + ')', (start1.x - dx), (start1.y - dy))
    },
    point: function (point) {
      let ctx = this.ctx
      ctx.arc((point.x), (point.y), 2, 0, Math.PI * 2)
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
    console.log('beforeUpdate')
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
