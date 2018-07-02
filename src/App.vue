<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <ul>
      <li @selectstart.prevent v-for='tab in tabs' :key='tab' :class='{active: tab === currentTab}' @click='currentTab = tab'>{{ tab }}</li>
    </ul>
    <keep-alive>
      <transition name="fade">
        <component :is='currentComponent' :class="['tab_']" v-model='msg'><h1 v-if='currentTab === "custom"'>{{ msg }}</h1></component>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import Hello from './components/HelloWorld'
import custom from './components/custom-input'
import myCanvas from './components/my-canvas'
import mySvg from './components/my-svg'
import Blogs from './components/Blogs'
export default {
  name: 'App',
  components: {Hello, custom, myCanvas, mySvg, Blogs},
  data: function () {
    return {
      msg: '',
      currentTab: 'myCanvas',
      tabs: ['Hello', 'custom', 'myCanvas', 'mySvg', 'Blogs']
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
ul {
  text-align: center;
  list-style-type: none
}
ul li {
  width: 100px;
  display: inline;
  padding: 20px;
  background-color: #e0e0e0;
}
ul li:hover {
  cursor: pointer;
}
.active {
  background-color: #efefef;
}
.tab_ {
  border: 1px solid #ccc;
  padding: 10px;
  height: 400px;
  width: auto;
  overflow: hidden;
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
