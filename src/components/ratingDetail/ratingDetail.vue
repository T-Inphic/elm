<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="all">{{ desc.all }}<i>57</i></span>
      <span class="positive">{{ desc.positive }}<i>57</i></span>
      <span class="negative">{{ desc.negative }}<i>57</i></span>
    </div>
    <div class="switch border-1px">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props:{
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default() {
          return ALL
        }
      },
      onlyContent: {
        type: Boolean,
        default: false,
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/scss/minborder.scss";
  .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    @include border-1px(rgba(7,17,27,0.1),false);
    span{
      display: inline-block;
      padding: 8px 12px;
      line-height: normal;
      border-radius: 2px;
      font-size: 12px;
      color: rgb(77,85,93);
      margin-right: 8px;
      &.all{
        background-color: rgb(0,160,220);
      }
      &.positive{
        background-color: rgba(0,160,220,0.2);
      }
      &.negative{
        margin-right: 0;
        background-color: rgba(77,85,93,0.2);
      }
    }
  }
  .switch{
      padding: 12px 18px; 
      font-size: 0;
      color: rgb(147,153,159);
      @include border-1px(rgba(7,17,27,0.1),false);
      .icon-check_circle{
        vertical-align: middle;
        margin-right: 4px;
        font-size: 24px;
      }
      .text{
        vertical-align: middle;
        font-size: 12px;
      }
    }
</style>