<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{path: '/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/business'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import  header from './header.vue'
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('../../static/data.json').then((res)=>{
      this.seller = res.data.sellers
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../common/scss/minborder.scss";
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .tab-item{
    flex: 1;
    text-align: center;
    a{
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
    }
    a.active{
      color: rgb(240, 20, 20);
    }
  }
  @include border-1px(rgba(7, 17, 27, .1));
}
</style>
