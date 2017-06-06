<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" alt="">
    </div>
  </div>  
</template>
<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease','descount','guarantee','invocie']
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
@import "../common/scss/minborder.scss";
  .header{
    color: #fff;
    background: rgba(0,0,0,0.5);
    position: relative;
    .content-wrapper{
      padding: 24px 12px 18px 18px;
      position: relative;
      font-size: 0;
      .avatar{
        display: inline-block;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        vertical-align: top;
        margin-left: 16px;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 18px;
            @include bg-img('../assets/images/header/brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name{
            vertical-align: middle;
            margin-left: 6px;
            font-size: 16px;
            font-weight: 600;
            line-height: 16px;
          }
        }
        .description{
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            line-height: 12px;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-img('../assets/images/header/decrease_1');
            }
            &.descount{
              @include bg-img('../assets/images/header/discount_1');
            }
            &.guarantee{
              @include bg-img('../assets/images/header/guarantee_1');
            }
            &.invocie{
              @include bg-img('../assets/images/header/invoice_1');
            }
          }
          .text{
              vertical-align: top;
              display: inline-block;
              font-size: 10px;
              line-height: 12px;
              color: rgb(255, 255, 255);
              padding: 1px 0;
            }
        }
      }
      .support-count{
        position: absolute;
        box-sizing: border-box;
        right: 12px;
        bottom: 18px;
        padding: 7px 8px;
        height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          margin-left: 2px;
          font-size: 10px;
        }
      }
    }
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 16px 0 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: rgba(1,17,27,0.2);
      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        width: 22px;
        height: 12px;
        margin-top: 7px;
        @include bg-img('../assets/images/header/bulletin')
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        font-size: 10px;
        margin: 0 4px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        top: 8px;
        right: 12px;
      }
    }
    .bg{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      overflow: hidden;
      filter: blur(10px);
    }
  }
</style>