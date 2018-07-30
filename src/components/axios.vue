<template>
  <div class="panel_axios">
    <input v-model="keyword" @keyup.enter="search" placeholder="搜索关键字">
    <h1 v-if="!display">loading</h1>
    <div v-else>
      <h1>最受欢迎的项目<a :href="repoUrl">{{ repoName }}</a></h1>
      <ViewCom v-for='el in topTen' :key="el.id" :backgroundImage='el.owner.avatar_url' :name="el.name" :url="el.html_url"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ViewCom from './viewcom'
export default {
  name: 'axios',
  components: {ViewCom},
  data: function () {
    return {
      display: false,
      keyword: '',
      url: 'http://api.github.com/search/repositories',
      repoName: '',
      repoUrl: '',
      topTen: []
    }
  },
  methods: {
    search: function () {
      axios.get(this.url, {params: {q: (this.keyword ? this.keyword : 'vue'), sort: 'stars'}}).then(
        (response) => {
          let result = response.data
          let repo = result.items[0]
          this.repoName = repo.name
          this.repoUrl = repo.html_url
          this.display = true
          this.topTen = []
          for (let i = 0; i < 10; i++) {
            this.topTen.push(result.items[i])
          }
          // console.log(this.topTen[0].owner.avatar_url)
        }
      ).catch(
        (error) => {
          alert('获取信息错误' + error)
        }
      )
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>

<style>
.panel_axios {
  overflow-y: auto;
}
.panel_axios::-webkit-scrollbar {
  width: 5px;
  height:10px;
  background-color:#ffffff;
}
.panel_axios::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #cecece;
}
.panel_axios::-webkit-scrollbar-thumb{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:#b5b1b1;
}
</style>
