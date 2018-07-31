<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <div class="toc">
      <ul>
        <li @selectstart.prevent v-for='tab in tabs' :key='tab' :class='{active: tab === currentTab}' @click='currentTab = tab'>{{ tab }}</li>
      </ul>
    </div>
    <div class="display">
      <keep-alive>
        <transition name="fade">
          <component :is='currentComponent' :class="['tab_']" v-model='msg'><h1 v-if='currentTab === "custom"'>{{ msg }}</h1></component>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Hello from './components/HelloWorld'
import custom from './components/custom-input'
import myCanvas from './components/my-canvas'
import mySvg from './components/my-svg'
import Blogs from './components/Blogs'
import Axios from './components/axios'
import Frame from './components/frame'
export default {
  name: 'App',
  components: {Hello, custom, myCanvas, mySvg, Blogs, Axios, Frame},
  data: function () {
    return {
      msg: '',
      currentTab: 'myCanvas',
      tabs: ['Hello', 'custom', 'myCanvas', 'mySvg', 'Blogs', 'Axios', 'Frame']
    }
  },
  computed: {
    currentComponent: function () {
      return this.currentTab
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.toc {
  width: 150px;
  height: 400px;
  outline: 1px solid red;
  display: inline-block;
  float: left;
  overflow: auto;
}
.toc ul {
  padding: 0px;
  margin: 0px;
  width: 100%;
  text-align: center;
  list-style-type: none;
  background-color: #e0e0e0;
}
.toc ul li {
  margin: 0px;
  width: 100%;
  padding: 20px 0px;
}
.toc ul li:hover {
  cursor: pointer;
}
.active {
  background-color: #efefef;
}
.tab_ {
  border: 1px solid #ccc;
  height: 400px;
  width: auto;
  overflow: hidden;
}
.display {
  width: auto;
  height: 400px;
  padding: 0px;
  margin: 0px;
}
.fade-enter-active{
  /*transition: fade-in .5s ease;*/
  transition: all .5s ease;
}
.fade-leave-active {
  /*transition: fade-in reverse .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  transition: all reverse .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  /*transform: translateX(10px);*/
  opacity: 0;
}

.fade-enter-to, .fade-leave {
  opacity: 1.0;
}

/*@keyframes fade-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}*/
</style>
