<template>
  <div id="list">
    <div class="search">
      <Input placeholder="搜索...">
          <Icon type="ios-search" slot="prefix" />
      </Input>
    </div>
    <p v-if="noteList.length>0" v-for="(item,index) in noteList" :key="index">
      {{item.title}}
    </p>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  computed:{
    noteList(){
      return this.$store.state.list.notelist
    }
  }
}
</script>
<style lang="stylus" scoped>
#list{
  width:250px;
  height:100%;
  background: #fff;
  border-right:1px solid #eaeaea;
  border-left:1px solid #eaeaea;
  float left
  .search{
    width:100%;
    padding:16px 10px;
  }
  p{
    display block;
    width:100%;
    height:40px;
    font-size:15px;
    padding:10px;
  }
  p:nth-child(2n){
    background #f2f2f2;
  }

}
</style>
