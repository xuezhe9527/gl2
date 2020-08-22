<template>
  <div>
    Search组件 <br>
    <!-- params参数:---{{$route.params.keyword}}  <br/>
    query参数:---{{$route.query.keyword1}}  <br/> -->
    params参数:---{{keyword}}  <br/>
    query参数:---{{keyword1}}  <br/>
  </div>
</template>
    
<script>
  export default {
    name: 'Search',
    props:['keyword','keyword1']
  }
</script>
    
<style lang="less" scoped>
    
</style>