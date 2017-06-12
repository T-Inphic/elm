<template>
  <div class="control" >
    <transition name="dynamic">
      <div class="buy-decrease" v-show="food.count > 0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="buy-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="buy-add icon-add_circle" @click.stop="addCount"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object,
      },
      scroll: {
        type: Object,
      }
    },
    methods: {
      addCount() {
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count++;
        }
        if(this.scroll){
          this.scroll.refresh();
        } 
      },
      decrease() {
        this.food.count--;
        if(this.scroll){
          this.scroll.refresh();
        }      
      }
    }
  }
</script>
<style lang="scss" scoped>
  .control{
    font-size: 0;
    .buy-add{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
    }
    .buy-decrease{
      display: inline-block;
      transition: all .3s ease;
      .inner{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        transition: all .3s ease;

      }
    }
    .dynamic-enter-active{
      opacity: 1;
      .inner{
        transform: rotate(0);
      }
    }
    .dynamic-enter{
      transform: translate3d(24px,0,0);
      .inner{
        transform: rotate(180deg);
      }
    }
    .dynamic-leave-active{
      opacity: 0;
      .inner{
        transform: rotate(180deg);
      }
    }
    .dynamic-leave{
      transform: translate3d(24px,0,0);
      .inner{
        transform: rotate(180deg);
      }
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