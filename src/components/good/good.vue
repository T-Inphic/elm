<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex === index}" @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="cont">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice"><span class="rmb">￥</span>{{ food.price }}</span>
                  <span v-if="food.oldPrice" class="oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="buyControl-wrapper">
                  <buyControl :food="food"></buyControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :select-foods="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopCart from '../shopCart/shopCart.vue'
  import buyControl from '../buyControl/buyControl.vue'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return{
        goods: [],
        listHeight: [],
        scrollY: 0,
      }
    },
    components: {
      shopCart,
      buyControl
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let minHeight = this.listHeight[i];
          let maxHeight = this.listHeight[i+1];

          if(!maxHeight || this.scrollY >= minHeight && this.scrollY < maxHeight){
            return i
          }
        }
        return 0
      },
      selectFood() {
        let foods = [];
        this.goods.map((item) => {
          item.foods.map((food) => {
            if(food.count){
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease','descount','guarantee','invocie','special'];
      this.$http.get('/goods').then((res)=>{
        this.goods = res.data.data
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let elem = foodList[index];
        this.foodScroll.scrollToElement(elem,300);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/scss/minborder.scss";
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item{
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
        &.current{
          background-color: #fff;
          position: relative;
          z-index: 10;
          margin-top: -1px;
          .text{
            font-weight: 700;
            &:after{
              border-top-width: 0;
            }
          }
        }
        .icon{
          display: inline-block;
          line-height: 12px;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-img('../../assets/images/goods/decrease_3');
          }
          &.descount{
            @include bg-img('../../assets/images/goods/discount_3');
          }
          &.guarantee{
            @include bg-img('../../assets/images/goods/guarantee_3');
          }
          &.invocie{
            @include bg-img('../../assets/images/goods/invoice_3');
          }
          &.special{
            @include bg-img('../../assets/images/goods/special_3');
          }
        }
        .text{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          @include border-1px(rgba(7,17,27,0.2));
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background-color: #f3f5f7; 
      }
      .food-item{
        display: flex;
        margin: 18px;
        margin-bottom: 0;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.2));
        &:last-child{
          &:after{
            display: none;
          }
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .desc{
            margin-bottom: 8px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .extra{
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
            .cont{
              margin-right: 12px;
            }
          }
          .price{
            line-height: 24px;
            .nowPrice{
              margin-right: 8px;
              font-weight: 700;
              font-size: 14px;
              color: rgb(240,20,20);
              .rmb{
                font-size: 10px;
              }
            }
            .oldPrice{
              text-decoration: line-through;
              color: rgb(147,153,159);
              font-weight: 700;
              font-size: 10px;
            }
          }
          .buyControl-wrapper{
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>