<template>
  <div class="pagination">
    <button :disabled="currentPageNum===1" @click="this.$emit('changePage',currentPageNum-1)">上一页</button>
    <button
      v-if="startEnd.start>1"
      :class="{active:currentPageNum===1}"
      @click="this.$emit('changePage',1)"
    >1</button>
    <button v-if="startEnd.start>2">···</button>

    <button
      v-for="(page, index) in startEnd.end"
      :key="page"
      v-if="page>=startEnd.start"
      :class="{active:currentPageNum===page}"
      @click="this.$emit('changePage',page)"
    >{{page}}</button>

    <button v-if="startEnd.end<totalPage-1">···</button>
    <button
      v-if="startEnd.end<totalPage"
      :class="{active:currentPageNum===totalPage}"
      @click="this.$emit('changePage',totalPage)"
    >{{totalPage}}</button>
    <button
      :disabled="currentPageNum===totalPage"
      @click="this.$emit('changePage',currentPageNum+1)"
    >下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>
    
<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    //计算总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页的第一张和最后一张
    startEnd() {
      let { totalPage, currentPageNum, continueNum } = this;
      let start;
      let end;
      let disNum;

      //如果总页数的比连续的页码数还要小，那么不需要过多计算
      if (totalPage < continueNum) {
        start = 1;
        end = totalPage;
      } else {
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);
        if (start <= 1) {
          disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        if (end >= totalPage) {
          disNum = end - totalPage;
          start -= disNum;
          end -= disNum;
        }
      }
      return { start, end };
    },
  },
};
</script>
    
<style lang="less" scoped>
.pagination {
  
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>