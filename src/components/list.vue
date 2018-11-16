<template>
  <div id="list">
    <div class="search">
      <Input placeholder="搜索...">
          <Icon type="ios-search" slot="prefix" />
      </Input>
    </div>
    <p :class="{active:activeNote == item}" @click="setActive(index)" v-if="noteList.length>0&&!item.trash&&cur == 'list'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon v-if="!item.favorite" type="ios-star-outline" @click="setfavarite(index)"></Icon>
        <Icon v-if="item.favorite" type="ios-star"  @click="setfavarite(index)"/>
        <Icon v-if="!item.trash" type="ios-trash-outline" @click="settrash(index)"></Icon>
      </span>
    </p>
    <p :class="{active:activeNote == item}" @click="setActive(index)" v-if="noteList.length>0&&!item.trash&&item.favorite&&cur=='favorite'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon v-if="item.favorite" type="ios-star" @click="setfavarite(index)"/>
        <Icon v-if="!item.trash" type="ios-trash-outline" @click="settrash(index)"></Icon>
      </span>
    </p>
    <p :class="{active:activeNote == item}" @click="setActive(index)" v-if="noteList.length>0&&item.trash&&cur=='trash'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon type="md-return-left" @click="settrash(index)"/>
      </span>
    </p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:-1,
    }
  },
  computed:{
    cur(){
      return this.$store.state.currentTab
    },
    noteList(){
      return this.$store.state.notelist
    },
    activeNote(){
      return this.$store.state.activeNote
    }
  },
  methods:{
    setfavarite(index){
      this.noteList[index].favorite = !this.noteList[index].favorite;
    },
    settrash(index){
      this.noteList[index].trash = !this.noteList[index].trash
    },
    setActive(index){
      this.active = index
      this.$store.commit('SET_ACTIVE',this.noteList[index])
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
    padding:16px 16px;
  }
  p{
    display block;
    width:100%;
    height:40px;
    line-height 40px
    font-size:15px;
    padding:0 10px 0 16px;
    cursor pointer
  }
  .active,p:hover{
    background #f2f2f2;
  }
  .title{
    display inline-block
    width:160px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .multiple{
    width:20%;
    float right
  }

}
</style>
