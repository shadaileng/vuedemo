<template>
  <div>
    <Comb v-for="(img, i) in imgs" :key='i' :url="img.src"/>
  </div>
</template>

<script>

import Comb from './Comb'
export default {
  name: 'Gallery',
  components: {Comb},
  data: function () {
    return {
      imgs: [
        {src: 'https://wx1.sinaimg.cn/mw1024/62d300b5gy1ftqx7oiqgvj20qo140gxf.jpg'},
        {src: 'https://wx1.sinaimg.cn/mw1024/62d300b5gy1ftqx7oiqgvj20qo140gxf.jpg'}
      ]
      // imgs: [{src: '/static/img/girl.jpg'}]
    }
  },
  methods: {},
  mounted: function () {},
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
