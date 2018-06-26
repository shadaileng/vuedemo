<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <router-view/> -->
    <ul>
      <li @selectstart.prevent v-for='tab in tabs' :key='tab' :class='{active: tab === currentTab}' @click='currentTab = tab'>{{ tab }}</li>
    </ul>
    <keep-alive>
      <transition name="fade">
        <component :is='currentComponent' :class="['tab_']" v-model='msg'><h1 v-if='currentTab == "custom"'>{{ msg }}</h1></component>
      </transition>
    </keep-alive>
<!--     <Hello><h1>点击</h1></Hello>
    <custom v-model="msg"></custom>
     -->
  </div>
</template>

<script>
import Hello from './components/HelloWorld'
import custom from './components/custom-input'
export default {
  name: 'App',
  components: {Hello, custom},
  data: function () {
    return {
      msg: '',
      currentTab: 'Hello',
      tabs: ['Hello', 'custom']
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
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
