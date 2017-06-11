<template>
<div>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left" :class="{ hightLight: totalCount > 0 || totalCount}" @click="listShow">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount > 0 || totalCount">{{ totalCount }}</div>
        </div>
        <div class="price">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right" :class="payClass">
        <div class="pay-text">{{ payPrice }}</div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="isShow">
        <div class="list-header border-1px">
          <span class="title">购物车</span><span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="foodList">
          <ul>
            <li class="food border-1px" v-for="food in selectFoods">
              <div class="name">
                <span>{{ food.name }}</span>
              </div>
              <div class="right-box">
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cart-wrapper">
                   <buyControl :food="food" :scroll="scroll"></buyControl>
                </div> 
              </div>  
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="mask" v-show="isShow"></div>
  </transition>
</div>
</template>
<script>
  import buyControl from '../buyControl/buyControl.vue'
  import BScroll from 'better-scroll'
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return{
        isShow: false,
        scroll: null,
      }
    },
    components: {
      buyControl
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.map((item) => {
          total += item.price * item.count;
        })
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.map((item) => {
          count += item.count;
        })
        if(count >= 99){
          count = '99+';
        }
        return count;
      },
      payPrice() {
        if(this.totalPrice === 0){
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }else{
          return "去结算"
        }
      },
      payClass() {
        if(this.totalPrice < this.minPrice){
          return 'no-enough'
        }else{
          return 'enough'
        }
      },

    },
    methods: {
      listShow() {
        if(this.totalCount){
          this.isShow = !this.isShow;
          if(this.isShow){
            this.$nextTick(() => {
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.foodList,{
                  click: true
                })
              }else{
                this.scroll.refresh();
              }
            })
          }
        }else{
          this.isShow = false;
        }
      },
      empty() {
        this.selectFoods.map((item) => {
          item.count = 0;
        })
        this.isShow = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/scss/minborder.scss";
  .shop-cart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
      display: flex;
      background-color: #141d27;
      font-size: 0;
      .content-left{
        flex: 1;
        &.hightLight{
          .logo-wrapper{
            .logo{
              background-color: rgb(0,160,220);
              .icon-shopping_cart{
                color: #fff;
              }
            }
          }
          .price{
            color: #fff;
          } 
        }
        .logo-wrapper{
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.2);
            text-align: center;
            .icon-shopping_cart{
              font-size: 24px;
              color: rgba(255,255,255,0.4);
              line-height: 44px;
            }
          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background-color: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
          }
        }
        .price{
          display: inline-block;
          vertical-align: top;
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
          margin-top: 16px;
          padding-right: 12px;
          color: rgba(255,255,255,0.4);
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1)
        }
        .desc{
          display: inline-block;
          font-size: 12px;
          line-height: 24px;
          margin-top: 16px;
          padding-left: 12px;
          color: rgba(255,255,255,0.4);
          box-sizing: border-box;
          
        }
      }
      .content-right{
        flex: 0 0 105px;
        width: 105px;
        font-size: 12px;
        background-color: #2b333b;
        &.enough{
          background-color: #00b43c;
          .pay-text{
            color: #fff;
          }
        }
        .pay-text{
          color: rgba(255,255,255,0.4);
          line-height: 56px;
          height: 56px;
          font-weight: 700;
          text-align: center;
        }
      } 
    }
    .shopcart-list{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: -1;
      transform: translate3d(0,-100%,0);
      .list-header{
        padding: 0 18px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 200;
        color: rgb(7,17,27);
        background-color: #f3f5f7;
        @include border-1px(rgba(7,17,27,0.1),false);
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0,160,220)
        }
      }
      .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background-color: #fff;
        .food{
          position: relative;
          padding: 12px 0;
          @include border-1px(rgba(7,17,27,0.1),false);
          .name{
            display: inline-block;
            line-height: 24px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .right-box{
            float: right;
            position: absolute;
            right: 0;
            top: 5px;
            .price{
              display: inline-block;
              vertical-align: top;
              margin-top: 8px;
              margin-right: 12px;
              line-height: 20px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240,20,20);
            }
            .cart-wrapper{
              display: inline-block;
              line-height: 24px;
              font-size: 24px;
            }
          }
        }
      }
    }
    .fold-enter-active{
      transition: all 0.5s;
      transform: translate3d(0,-100%,0);
    }
    .fold-enter{
      transform: translate3d(0,100%,0);
    }
    .fold-leave{
      transform: translate3d(0,-100%,0);
    }
    .fold-leave-active{
      transition: all 0.5s;
      transform: translate3d(0,100%,0);
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background-color: rgba(7,17,27,0.6)
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>