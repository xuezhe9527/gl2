<template>
  <!-- <div>Home组件</div> -->
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>
    
<script>
import Brand from "./Brand";
import Floor from "./Floor";
import Like from "./Like";
import ListContainer from "./ListContainer";
import Rank from "./Rank";
import Recommend from "./Recommend";
export default {
  name: "Home",
  components:{
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    Recommend
  }
};
</script>
    
<style lang="less" scoped>
</style>