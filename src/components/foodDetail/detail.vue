<template>
  <transition name="move">
    <div class="food-detail" v-show="detailShow" ref="detail">
      <div class="food-content">
        <div class="image-header">
          <div class="goback">
            <i class="icon-arrow_lift" @click="close"></i>
          </div>
          <img :src="food.image" alt="">
        </div>
        <div class="content border-1px">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <div class="extra">
              <span class="cont">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
            </div>
            <div class="price">
              <span class="nowPrice"><span class="rmb">￥</span>{{ food.price }}</span>
              <span v-if="food.oldPrice" class="oldPrice">￥{{ food.oldPrice }}</span>
            </div>
            <div class="add-shopcart">
              <div class="add-btn" v-if="!food.count" @click="addShopCart">加入购物车</div>
              <div class="buy-btn" v-if="food.count">
                <buyControl :food="food"></buyControl>
              </div>
            </div>
          </div>
        </div>
        <div class="food-info border-1px">
          <h1>商品介绍</h1>
          <p class="food">{{ food.info }}</p>
        </div>
        <div class="food-info food-rating border-1px">
          <h1>商品评价</h1>
          <ratingDetail :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :foodRating="food.ratings"></ratingDetail>
          <div class="switch border-1px">
            <span class="icon-check_circle" :class="{'active': isShowRating}" @click="selectRating()"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="rating-list">
            <ul>
              <li class="rating-item border-1px" v-for="item in foodRating">
                <div class="item-time">
                  <div class="time">{{ item.rateTime }}</div>
                  <div class="avatar">
                    <span>{{ item.username }}</span>
                    <img :src="item.avatar" alt="" width="12" height="12">
                  </div>
                </div>
                <div class="item-text">
                  <span :class="{'icon-thumb_up': !item.rateType,'icon-thumb_down': item.rateType}"></span>
                  <p>{{ item.text }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import buyControl from '../buyControl/buyControl'
  import ratingDetail from '../ratingDetail/ratingDetail.vue'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import eventHub from '../bus/bus.js'


  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      food: {
        type: Object
      }
    },
    components: {
      buyControl,
      ratingDetail
    },
    data() {
      return{
        detailShow: false,
        selectType: ALL,
        onlyContent: true,
        isShowRating: false,
        foodRating: [],
        selectNum: 2,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created() {
      this.foodRating = this.food.ratings;
      eventHub.$on('select-tab',this.selectTab);
    },
    methods: {
      show() {
        this.detailShow = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.foodRating = this.food.ratings;
        this.$nextTick(() => {
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.detail,{
              click: true
            });
          }else {
            this.scroll.refresh()
          }
        })
      },
      close() {
        this.detailShow = false;
      },
      addShopCart() {
        Vue.set(this.food,'count',1);
      },
      selectRating() {
        this.isShowRating = !this.isShowRating;
        this.selectTab(this.selectNum);
      },
      selectTab(index) {
        this.foodRating = [];
        this.selectNum = index;
        if(index === 2){
          if(this.isShowRating){
            this.food.ratings.map((item) => {
              if(item.text){
                this.foodRating.push(item)
              }
            })  
          }else {
            this.foodRating = this.food.ratings;
          }
        }else{
          if(this.isShowRating){
            this.food.ratings.map((item) => {
              if(item.rateType === index){
                if(item.text){
                  this.foodRating.push(item)
                }
              }
            })
          }else {
            this.food.ratings.map((item) => {
              if(item.rateType === index){
                this.foodRating.push(item)
              }
            })
          }
        }
        this.$nextTick(() => {
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.detail,{
              click: true
            });
          }else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/scss/minborder.scss";
  .food-detail{
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #f3f5f7;
    transform: translate3d(0,0,0);
    .food-content{
      
    }
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
      background-color: #fff;
      @include border-1px(rgba(7,17,27,0.1),true)
      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .detail{
        position: relative;
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
            font-size: 14px;
            color: rgb(240,20,20);
            .rmb{
              font-size: 10px;
            }
          }
          .oldPrice{
            line-height: 24px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: line-through;
            color: rgb(147,153,159);
          }
        }
        .add-shopcart{
          position: absolute;
          bottom: 0;
          right: 0;
          .add-btn{
            box-sizing: border-box;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            border-radius: 12px;
            font-size: 10px;
            color: #fff;
            background-color: rgb(0,160,220);
          }
        }
      }
    }
    .food-info{
      margin: 16px 0 16px 0;
      padding: 18px;
      @include border-1px(rgba(7,17,27,0.1),true)
      background-color: #fff;
      .food{
        padding: 6px 8px 0 8px;
        line-height: 24px;
        color: rgb(77,85,93);
        font-size: 12px;
        font-weight: 200px;
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
        &.active{
          color: #00c850;
        }
      }
      .text{
        vertical-align: middle;
        font-size: 12px;
      }
    }
  .rating-list{
    padding: 0 18px;
    .rating-item{
      padding: 12px 0;
      @include border-1px(rgba(7,17,27,0.1),false);
      .item-time{
        margin-bottom: 6px;
        height: 12px;
        line-height: 12px;
        font-size: 0;
        .time,.avatar{
          display: inline-block;
          font-size: 10px;
        }
        .avatar{
          float: right;
          span{
            margin-right: 6px;
            height: 12px;
            line-height: 12px;
          }
          img{
            vertical-align: top;
            border-radius: 50%;
          }
        }
      }
      .item-text{
        font-size: 0;
        span,p{
          display: inline-block;
          vertical-align: middle;
        }
        span{
          margin-right: 4px;
        }
        p{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .icon-thumb_up{
          line-height: 24px;
          color: rgb(0,160,220);
          font-size: 12px;
        }
        .icon-thumb_down{
          line-height: 24px;
          color: rgb(147,153,159);
          font-size: 12px;
        }
      }
    }
  }
    }
    .food-rating{
      padding: 18px 0;
      h1{
        padding: 0 18px;
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