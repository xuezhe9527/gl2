<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer></Footer> -->
    <!-- 登陆注册的时候隐藏底部 -->
    <Footer v-if="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  mounted(){
    // 由于TypeNav组件时嵌套在home和search组件内部得，故home和search切换得时候，typaNav也会销毁并重mouted，多发一次请求，所以放到APP里面去请求
    this.getCategoryList();
  },
  methods:{
    //获取三级分类导航列表
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    },
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
