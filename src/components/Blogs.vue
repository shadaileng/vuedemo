<template>
  <div>
    <img class="blog_img" src="../assets/logo.png">
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
      comments: [
        {
          index: 0,
          name: 'bob',
          content: 'test 22222222222 222222 22222222222222 222222222222222222222',
          time: new Date().toLocaleString()
        },
        {
          index: 1,
          name: 'ace',
          content: 'test1',
          time: new Date().toLocaleString()
        },
        {
          index: 2,
          name: 'fiona',
          content: 'test2',
          time: new Date().toLocaleString()
        },
        {
          index: 3,
          name: 'emaly',
          content: 'test1',
          time: new Date().toLocaleString()
        }
      ],
      name: 'undefine'
    }
  },
  methods: {
    addComment: function (content) {
      this.comments.push({name: this.name, content: content, time: new Date().toLocaleString()})
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
  width: 50%;
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
