<template>
  <div class="panel_frame">
    <div class="header_frame"></div>
    <div class="content_frame">
      <div class="header_content_frame"></div>
      <div class="nav_content_frame"></div>
      <div class="body_content_frame">1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br></div>
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
  mounted: function () {
    document.querySelector('.body_content_frame').addEventListener('scroll', (event) => {
      let top = event.target.scrollTop
      let height = event.target.offsetHeight
      let scrollHeight = event.target.scrollHeight
      if (top < 0.2 * height) {
        document.querySelector('.content_frame').style.height = '90%'
        document.querySelector('.header_content_frame').style.height = '5%'
        document.querySelector('.body_content_frame').style.height = '93%'
        document.querySelector('.nav_content_frame').style.height = '93%'
      } else if (top > 0.2 * height && top < scrollHeight - height) {
        document.querySelector('.header_content_frame').style.height = '0'
        document.querySelector('.body_content_frame').style.height = '100%'
        document.querySelector('.nav_content_frame').style.height = '100%'
      } else {
        console.log('bottom')
        document.querySelector('.content_frame').style.height = '77%'
        // document.querySelector('.header_content_frame').style.height = '5%'
        document.querySelector('.body_content_frame').style.height = '100%'
        document.querySelector('.nav_content_frame').style.height = '100%'
      }
      console.log(event.target.scrollTop)
      console.log(event.target.offsetHeight)
      console.log(event.target.scrollHeight)
    })
    document.querySelector('.body_content_frame').addEventListener('mousemove', (event) => {
      // console.log('(' + event.offsetX + ', ' + event.offsetY + ')')
    })
  },
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel_frame {
  background: #E3E7E2;
  background-image: url('https://wx1.sinaimg.cn/mw1024/62d300b5gy1ftqx7oiqgvj20qo140gxf.jpg');
  background-size: cover;
  background-position: center;
  padding: 10px;
  overflow: hidden;
}
.header_frame, .content_frame, .header_content_frame, .nav_content_frame, .body_content_frame, .footer_frame {
  /*outline: 1px solid #f4f4f4;*/
  border-radius: 5px;
  background: #fffd;
  transition: height 1s;
}
.content_frame {
  background: #fffa;
  transition: height 0.3s;
}
.panel_frame > * {
  margin: 0;
  padding: 0;
}

.body_content_frame::-webkit-scrollbar {
  width: 5px;
  height:10px;
  background-color:#ffffff;
}
.body_content_frame::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #cecece;
}
.body_content_frame::-webkit-scrollbar-thumb{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:#b5b1b1;
}
.header_frame {
  width: 100%;
  height: 10%;
  margin-bottom: 1%;
  text-align: center;
  line-height: 80px;
}
.content_frame {
  width: 100%;
  height: 77%;
  margin-bottom: 1%;
  font-size: 0px;
}
.header_content_frame {
  width: 100%;
  height: 5%;
  margin-bottom: 1%;
  text-align: center;
  line-height: 50px;
}
.nav_content_frame {
  width: 10%;
  height: 93%;
  float: left;
  font-size: 16px;
  display: inline-block;
  align-items: top;
  text-align: center;
  word-wrap: break-word;
}
.body_content_frame {
  width: 89%;
  height: 93%;
  float: right;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  /*margin-left: 1%;*/
  line-height: 100%;
  overflow: auto;
}
.footer_frame {
  width: 100%;
  height: 10%;
  text-align: center;
  line-height: 80px;
}
</style>
