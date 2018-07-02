<template>
  <div>
    <div class="blog_img">
      <img src="../assets/logo.png">
    </div>
    <div class="blog_comment">
        <BlogAdd :addComment="addComment"></BlogAdd>
        <BlogItems  v-for='comment in comments' :key='comment.index' :comment='comment'></BlogItems>
    </div>
  </div>
</template>

<script>
import BlogAdd from './BlogAdd'
import BlogItems from './BlogItems'
export default {
  name: 'Blogs',
  components: {BlogAdd, BlogItems},
  data: function () {
    return {
      comments: localStorage.getItem('comments') === '' ? [] : JSON.parse(localStorage.getItem('comments')),
      name: 'undefine'
    }
  },
  methods: {
    addComment: function (content) {
      this.comments.push({name: this.name, content: content, time: new Date().toLocaleString()})
    }
  },
  watch: {
    comments: function () {
      localStorage.setItem('comments', JSON.stringify(this.comments))
    }
  },
  mounted: function () {},
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog_img {
  display: inline-block;
  position: relative;
  float: left;
  text-align: center;
  width: 59%;
  height: 100%;
}
.blog_comment {
  display: inline-block;
  position: relative;
  float: right;
  width: 40%;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: auto;
  /*background-color: red;*/
}
</style>
