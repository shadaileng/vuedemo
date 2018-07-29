<template>
  <div>
    <input v-model="keyword" @keyup.enter="search" placeholder="搜索关键字">
    <h1 v-if="!display">loading</h1>
    <h1 v-else="display">最受欢迎的项目<a :href="repoUrl">{{ repoName }}</a></h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'axios',
  data: function () {
    return {
      display: false,
      keyword: '',
      url: 'http://api.github.com/search/repositories?sort=stars&q=',
      repoName: '',
      repoUrl: ''
    }
  },
  methods: {
    search: function () {
      axios.get(this.url + this.keyword).then(
        (response) => {
          console.log(response)
        }
      ).catch(
        (error) => {
          alert('获取信息错误' + error)
        }
      );
    }
  },
  mounted: function () {
    const url = `http://api.github.com/search/repositories?q=vu&sort=stars`
/*    axios.get(url).then(
    	(response) => {
    		let result = response.data
    		let repo = result.items[0]
    		this.repoName = repo.name
    		this.repoUrl = repo.url
    		this.display = true
    	}
    ).catch(
      (error) => {
        alert('获取信息错误' + error)
      }
    )
    
    axios({
      method: 'get',
      params: {
        q: 'vu',
        sort: 'stars'
      },
      url: url
    }).then(
      (response) => {
        let result = response.data
        let repo = result.items[0]
        this.repoName = repo.name
        this.repoUrl = repo.url
        this.display = true
      }
    ).catch(
      (error) => {
        alert('获取信息错误' + error)
      }
    )
    */
    
    let instance = axios.create({
      method: 'get',
      params: {
        q: 'vu',
        sort: 'stars'
      }
    });
    instance.get(url).then(
      (response) => {
        let result = response.data
        console.log(result)
        let repo = result.items[0]
        this.repoName = repo.name
        this.repoUrl = repo.url
        this.display = true
      }
    ).catch(
      (error) => {
        alert('获取信息错误' + error)
      }
    )
  }
}
</script>

<style>
</style>
