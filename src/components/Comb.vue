<template>
  <div class="comb">
    <div class="first"><img :src="url"></div>
    <div class="second"><img :src="url"></div>
    <div class="third"><img :src="url"></div>
  </div>
</template>

<script>
export default {
  name: 'Comb',
  props: ['url'],
  data: function () {
    return {}
  },
  methods: {},
  mounted: function () {
    // console.log(this)
    // document.querySelector('.comb').querySelectorAll('img').forEach( (el) => {
    //   el.src = this.url;
    // })
  },
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.comb {
  /*width: 240px;*/
  /*height: 276px;*/

  width: 15%;
  height: 0;
  padding-bottom: 17.25%;

  /*width: 120px;*/
  /*height: 138px;*/
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  float: left;
  margin: 2%;
  /*margin: 100px 100px;*/
}

.comb div {
  position: absolute;
  top: 25%;
  width: 100%;
  height: 50%;
  /*outline: 1px solid #00c;*/
  overflow: hidden;
  border-left: 1px solid #888;
  border-right: 1px solid #888;
}

.comb div img {
  width: 100%;
  height: 201.71%;
  position: relative;
  top: -50%;
}
.comb .first {

}
.comb .second {
  transform: rotate(60deg);
}

.comb .second img {
  transform: rotate(-60deg);
}
.comb .third {
  transform: rotate(-60deg);
}
.comb .third img {
  transform: rotate(60deg);
}
</style>
