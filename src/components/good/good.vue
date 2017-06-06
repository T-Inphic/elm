<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57px" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="cont">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">￥{{ food.price }}</span>
                  <span v-if="food.oldPrice" class="oldPrice">￥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
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
    data() {
      return{
        goods: {}
      }
    },
    created() {
      this.classMap = ['decrease','descount','guarantee','invocie','special'];
      this.$http.get('/goods').then((res)=>{
        this.goods = res.data.data
      })
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
        margin: 0 auto;
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
            font-weight: 700;
            line-height: 24px;
            .nowPrice{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .oldPrice{
              text-decoration: line-through;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>