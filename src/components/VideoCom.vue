<template>
  <div>
    <video id="my-player" @click="play" ref="video" width="100%" height="100%" @ended="play" controls="true">
    </video>
  </div>
</template>

<script>
// import videojs from 'video.js'
export default {
  name: 'VideoCom',
  data: function () {
    return {
      list: ['//gslb.miaopai.com/stream/en-QXoUAJ1zcU6whK5KMlwdauTDR-uVBzXbOkA__.mp4?yx=&refer=weibo_app&vend=weibo&label=mp4_hd&mpflag=8&Expires=1536634204&ssig=rCtObwwInZ&KID=unistore,video', '//gslb.miaopai.com/stream/6pDnYG1H1gfyrg33T0Zu3DdtFe7EgPvx6ApMDQ__.mp4?yx=&refer=weibo_app&vend=weibo&label=mp4_hd&mpflag=8&Expires=1536634204&ssig=Qi3g2zY%2B%2B3&KID=unistore,video'],
      current: 0
    }
  },
  methods: {
    play: function (e) {
      console.log('current: ' + this.current)
      let el = (e && e.taget) || this.$refs.video
      el.pause()
      el.setAttribute('src', this.list[this.current])
      el.load()
      el.play()
      this.current++
      if (this.current >= this.list.length) this.current = 0
    }
  },
  mounted: function () {
    this.play()
  },
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 100%;
  height: 100%;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  -o-background-size:cover;
  background-size:cover;
  background:transparent url('https://wx1.sinaimg.cn/mw1024/62d300b5gy1ftqx7oiqgvj20qo140gxf.jpg');
}
</style>
