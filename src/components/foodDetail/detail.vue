<template>
  <transition name="move">
    <div class="food-detail" v-show="detailShow">
      <div class="food-content">
        <div class="image-header">
          <div class="goback">
            <i class="icon-arrow_lift" @click="close"></i>
          </div>
          <img :src="foodData.image" alt="">
        </div>
        <div class="content">
          <h1 class="title">{{ foodData.name }}</h1>
          <div class="detail">
            <div class="extra">
              <span class="cont">月售{{ foodData.sellCount }}份</span><span>好评率{{ foodData.rating }}%</span>
            </div>
            <div class="price">
              <span class="nowPrice"><span class="rmb">￥</span>{{ foodData.price }}</span>
              <span v-if="foodData.oldPrice" class="oldPrice">￥{{ foodData.oldPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    props: {
      foodData: {
        type: Object
      }
    },
    data() {
      return{
        detailShow: false,
      }
    },
    methods: {
      show() {
        this.detailShow = true;
      },
      close() {
        this.detailShow = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .food-detail{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transform: translate3d(0,0,0);
    .image-header{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      .goback{
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 30;
        .icon-arrow_lift{
          display: block;
          padding: 10px;
          font-size: 20px;
          color: rgba(255,255,255,0.6);
        }
      }
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .content{
      padding: 18px;
      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .detail{
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        .extra{
          line-height: 20px;
          color: rgb(147,153,159);
          font-size: 10px;
          .cont{
            margin-right: 12px;
          }
        }
        .price{
          .nowPrice{
            margin-right: 10px;
            line-height: 24px;
            font-weight: 700;
            font-size: 10px;
            color: rgb(240,20,20);
          }
          .oldPrice{
            line-height: 24px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: line-through;
            color: rgb(147,153,159);
          }
        }
      }
    }
  }
  .move-enter-active,.move-leave-active {
    transition: all .3s linear
  }
  .move-enter{
    transform: translate3d(100%,0,0);
  }
  .move-leave-active{
    transform: translate3d(100%,0,0);
  }
  .move-leave{
    transform: translate3d(0,0,0);
  }
</style>