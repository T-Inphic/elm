<template>
  <div class="control">
    <div class="buy-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decrease"></div>
    <div class="buy-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="buy-add icon-add_circle" @click="addCount"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object,
      }
    },
    created() {

    },
    methods: {
      addCount() {
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count++;
        }
      },
      decrease() {
        this.food.count--;       
      }
    }
  }
</script>
<style lang="scss" scoped>
  .control{
    font-size: 0;
    .buy-decrease,.buy-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
    }
    .buy-count{
      display: inline-block;
      vertical-align: top;
      padding-top: 6px;
      width: 12px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147,153,159);
    }
  }
</style>