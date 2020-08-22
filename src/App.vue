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
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
