<template>
  <div class="panel_frame">
    <div class="header_frame"></div>
    <div class="content_frame">
      <div class="header_content_frame"></div>
      <div class="nav_content_frame"></div>
      <div class="body_content_frame"></div>
    </div>
    <div class="footer_frame"></div>
  </div>
</template>

<script>
export default {
  name: 'frame',
  data: function () {
    return {}
  },
  methods: {},
  mounted: function () {},
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel_frame {
  background: #E3E7E2;
  padding: 10px;
  overflow: hidden;
}
.panel_frame > div {
  margin: 0;
  padding: 0;
}
.header_frame {
  width: 100%;
  height: 10%;
  background: #fff;
  border: 1px solid #f4f4f4;
  margin-bottom: 3px;
  text-align: center;
  line-height: 80px;
}
.content_frame {
  width: 100%;
  height: 75%;
  margin-bottom: 5px;
  font-size: 0px;
}
.header_content_frame {
  width: 100%;
  height: 5%;
  background: #fff;
  border: 1px solid #f4f4f4;
  margin-bottom: 3px;
  text-align: center;
  line-height: 50px;
}
.nav_content_frame {
  width: 10%;
  height: 89%;
  font-size: 16px;
  display: inline-block;
  align-items: top;
  text-align: center;
  background: #fff;
  border: 1px solid #f4f4f4;
  word-wrap: break-word;
}
.body_content_frame {
  width: 85%;
  height: 89%;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  margin-left: 5px;
  background: #eee;
  border: 1px solid #f4f4f4;
  line-height: 100%;
}
.footer_frame {
  width: 100%;
  height: 10%;
  background: #fff;
  border: 1px solid #f4f4f4;
  text-align: center;
  line-height: 80px;
  background: #ddd;
}
</style>
