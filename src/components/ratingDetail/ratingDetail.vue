<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="all" :class="{'active': ownSelectType === 2}" @click="select(2)">{{ desc.all }}<i>57</i></span>
      <span class="positive" :class="{'active': ownSelectType === 0}" @click="select(0)">{{ desc.positive }}<i>57</i></span>
      <span class="negative" :class="{'active': ownSelectType === 1}" @click="select(1)">{{ desc.negative }}<i>57</i></span>
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
      },
      foodRating: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return{
        ownSelectType: this.selectType,
      }
    },
    methods: {
      select(index) {
        this.ownSelectType = index;
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
        background-color: rgba(0,160,220,0.2);
        &.active{
          background-color: rgb(0,160,220);
          color: #fff;
        }
      }
      &.positive{
        background-color: rgba(0,160,220,0.2);
        &.active{
          background-color: rgb(0,160,220);
          color: #fff;
        }
      }
      &.negative{
        margin-right: 0;
        background-color: rgba(77,85,93,0.2);
        &.active{
          background-color: rgb(0,160,220);
          color: #fff;
        }
      }
    }
  }
</style>