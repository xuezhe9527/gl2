<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @searchForTrademark="searchForTrademark" @searchForAttr="searchForAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:sortFlag==='1'}">
                  <a href="javascript:;" @click="sortGoods('1')">
                    综合
                    <i
                      class="iconfont"
                      :class="{'iconarrow-up-bold':sortType==='asc','iconarrow-down-bold':sortType==='desc'}"
                      v-if="sortFlag==='1'"
                    ></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:sortFlag==='2'}">
                  <a href="javascript:;" @click="sortGoods('2')">
                    价格
                    <i
                      class="iconfont"
                      :class="{'iconarrow-up-bold':sortType==='asc','iconarrow-down-bold':sortType==='desc'}"
                      v-if="sortFlag==='2'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"> -->

                      <router-link :to="`/detail/${goods.id}`">
                        <img :src="goods.defaultImg" />
                      </router-link>
                    <!-- </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">
                      <!-- Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)-->
                      {{goods.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 加这个div只是为了包裹分页组件使其居中 -->
          <div style="display:flex;justify-content:center;align-items:center"> 
            <Pagination :currentPageNum="searchParams.pageNo" 
                      :pageSize="searchParams.pageSize"
                      :total="goodsListInfo.total"
                      :continueNum="5"
                      @changePage="changePage"/>  
          </div>     

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "2:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  // 在页面挂载完成前准备好要发送得参数数据
  beforeMount() {
    this.handleSearchParams();
  },
  mounted() {
    this.getGoodsListInfo();
  },
  methods: {
    //获取商品分类信息
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    //处理获取商品分类前的请求参数
    handleSearchParams() {
      let { keyword } = this.$route.params;
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      } = this.$route.query;
      let searchParams1 = {
        ...this.searchParams,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };
      Object.keys(searchParams1).forEach((item) => {
        if (!searchParams1[item]) {
          delete searchParams1[item];
        }
      });
      this.searchParams = searchParams1;
    },
    //移除CategoryName后的重新发起请求
    removeCategoryName() {
      this.searchParams.categoryName = "";
      // this.getGoodsListInfo() //不能这样请求，因为浏览器的地址栏没有发生变化（即路由）
      // this.$router.push({name:'search',params:this.$route.params})

      //移除CategoryName后，应该重新从第一页开始搜索,（结合分页逻辑）
      this.searchParams.pageNo = 1
      this.$router.replace({ name: "search", params: this.$route.params });
    },
    //移除关键字
    removeKeyword() {
      this.searchParams.keyword = "";

      //这里还需要清空header的搜索框
      this.$bus.$emit("clearKeyword");

      //移除关键字后，应该重新从第一页开始搜索
      this.searchParams.pageNo = 1
      // this.$router.push({name:'search',query:this.$route.query})
      this.$router.replace({ name: "search", query: this.$route.query });
    },
    //移除品牌后
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getGoodsListInfo(); //trade和属性都可以直接调用方法重新查詢数据，因为他们没有修改路由
    },
    //移除某个属性
    removeProp(index) {
      this.searchParams.props.splice(index, 1);
      this.getGoodsListInfo();
    },
    //选择一个品牌
    searchForTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.trName}`;
      this.getGoodsListInfo();
    },
    //选择一个属性
    searchForAttr(attr, attrValue) {
      //  "属性ID:属性值:属性名"
      this.searchParams.props.push(
        `${attr.attrId}:${attrValue}:${attr.attrName}`
      );
      this.getGoodsListInfo();
    },
    //点击切换排序
    sortGoods(sortFlag) {
      let originFlag = this.sortFlag;
      let originType = this.sortType;
      let newOrder;
      if (sortFlag === originFlag) {
        newOrder = `${originFlag}:${originType === "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${sortFlag}:desc`;
      }

      this.searchParams.order = newOrder;
      this.getGoodsListInfo();
    },
    //分页时切换页码
    changePage(page){
      // console.log("进来了")
      this.searchParams.pageNo = page
      this.getGoodsListInfo()
    }
  },
  watch: {
    $route() {
      this.handleSearchParams();
      this.getGoodsListInfo();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      goodsListInfo:state=>state.search.goodsListInfo
    }),
    sortFlag() {
      return this.searchParams.order.split(":")[0];
    },
    sortType() {
      return this.searchParams.order.split(":")[1];
    },
  },
  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>