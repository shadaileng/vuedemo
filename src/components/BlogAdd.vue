<template>
  <div>
    <input @focus="isFocus = true" class="blog_comment_add" type="text" placeholder="输入评论" v-model="content">
    <button class="blog_add_sub" v-show="isFocus" @click="addComment_">评论</button>
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
  margin: 20px auto;
  padding: 5px 10px;
  width: 80%;
  margin: 20px auto 5px
}
.blog_add_sub {
  position: relative;
  left: 36%;
}
</style>
