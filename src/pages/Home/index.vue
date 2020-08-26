<template>
  <!-- <div>Home组件</div> -->
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>
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
import { mapState } from 'vuex';
export default {
  name: "Home",
  mounted(){
    this.getFloorList()
  },
  methods:{
    getFloorList(){
      this.$store.dispatch('getFloorList')
    }
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  },

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