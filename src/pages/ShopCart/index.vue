<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- <ul class="cart-list"> -->
        <ul
          class="cart-list"
          v-for="(shopcart, index) in shopCartList"
          :key="shopcart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopcart.isChecked"
              @click="changeOneShopCartChecked(shopcart)"
            />
          </li>
          <li class="cart-list-con2">
            <!-- <img src="./images/goods1.png"> -->
            <!-- <div class="item-msg">米家（MIJIA） 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div> -->
            <img :src="shopcart.imgUrl" />
            <div class="item-msg">{{ shopcart.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <!-- <span class="price">399.00</span> -->
            <span class="price">{{
              shopcart.cartPrice ? shopcart.cartPrice : 0
            }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="updateCartNum(shopcart, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopcart.skuNum"
              minnum="1"
              class="itxt"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="updateCartNum(shopcart, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              shopcart.cartPrice * shopcart.skuNum * 1
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteOneShopCart(shopcart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- <input class="chooseAll" type="checkbox" :checked="isAllChecked" /> -->
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCheckedShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <!-- <i class="summoney">0</i> -->
          <i class="summoney">{{ totalMoney }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",

  mounted() {
    this.getShopCartList();
  },
  methods: {
    //获取购物车列表
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    //点击每一项商品前面的复选框，改变其选中状态,
    async changeOneShopCartChecked(cart) {
      // 这个方法返回的结果可能是一个promise，所以要等待这个方法的执行完毕，且最好用trycatch包裹可能出现的问题
      try {
        await this.$store.dispatch("changeOneShopCartChecked", {
          skuId: cart.skuId,
          isChecked: cart.isChecked === 0 ? 1 : 0,
        });
        this.getShopCartList(); //因为这次请求需要上面的方法执行完毕才可以执行，所以需要等待前一个方法
      } catch (error) {
        console.log(error.message);
      }
    },
    //点击+- 修改购物车的数量
    async updateCartNum(shopcart, changeNum) {
      try {
        await this.$store.dispatch("addOrUpdateToCart", {
          skuId: shopcart.skuId,
          skuNum: changeNum,
        });
        this.getShopCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    //删除单个购物车
    async deleteOneShopCart(skuId) {
      try {
        await this.$store.dispatch("deleteOneShopCart", skuId);
        this.getShopCartList();
      } catch (error) {
        console.log(error.message);
      }
    },
    //删除选中的购物车
    async deleteCheckedShopCart(){
      try {
          await this.$store.dispatch('deleteCheckedShopCart')
          this.getShopCartList()
      } catch (error) {
          console.log(error.message);
      }
    },

  },

  computed: {
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList,
    }),
    //计算全选按钮是否选中
    isAllChecked: {
      get() {
        return (
          this.shopCartList.every((item) => item.isChecked === 1) &&
          this.shopCartList.length > 0
        );
      },
      async set(val) {
        try {
          // console.log('index里面:',val);
          const result = await this.$store.dispatch(
            "changeAllShopCartChecked",
            val ? 1 : 0
          );
          this.getShopCartList();
        } catch (error) {
          console.log(error.message);
        }
      },
    },
    //计算已选商品数量
    totalNum() {
      return this.shopCartList.reduce((pre, item) => {
        if (item.isChecked) {
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },
    //计算选中商品的总价
    totalMoney() {
      return this.shopCartList.reduce((pre, item) => {
        if (item.isChecked) {
          pre += item.skuNum * item.skuPrice;
        }
        console.log("当前价格" + pre);
        return pre;
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>