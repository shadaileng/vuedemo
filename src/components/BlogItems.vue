<template>
  <div>
    <div class="blog_comment_items" @mouseenter="reply = true" @mouseleave="reply = false">
      <p><span class="blog_comment_item_name">{{ comment.name }}</span>：<span class="blog_comment_item_content">{{ comment.content }}</span></p>
      <div><span class="blog_comment_item_time">{{ comment.time }}</span><span class="blog_comment_item_opt" v-show="reply"><a href="#">回复</a></span></div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogItems',
  props: ['comment'],
  data: function () {
    return {
      reply: false
    }
  },
  methods: { },
  mounted: function () { },
  destroyed: function () { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blog_comment_items {
  position: relative;
  margin: 0px auto;
  width: 90%;
  text-align: left;
}
.blog_comment_item_name {
  word-wrap: break-word;
  color: #f59911e0;
}
.blog_comment_item_time {
  position: relative;
  left: 0px;
}
.blog_comment_item_opt {
  position: relative;
  float: right;
}
</style>
