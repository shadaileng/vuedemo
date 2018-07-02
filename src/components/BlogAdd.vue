<template>
  <div class="blog_comment_add">
    <input @focus="isFocus = true" @keyup.enter="addComment_" type="text" placeholder="输入评论" v-model="content">
    <div class="blog_add_sub" v-show="isFocus">
      <button @click="addComment_">评论</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogAdd',
  props: {
    addComment: {
      type: Function,
      required: true
    }
  },
  data: function () {
    return {
      isFocus: false,
      content: ''
    }
  },
  methods: {
    addComment_: function () {
      if (!this.content) {
        alert('评论失败，内容不能为空')
      } else {
        this.addComment(this.content)
        this.content = ''
      }
      this.isFocus = false
    }
  },
  mounted: function () {},
  destroyed: function () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog_comment_add {
  position: relative;
}
.blog_comment_add input {
  position: relative;
  margin: 20px auto;
  width: 80%;
  margin: 20px auto 5px;
  display: block;
}
.blog_add_sub {
  position: relative;
  text-align: right;
}
.blog_add_sub button {
  position: relative;
  right: 10%;
}
</style>
