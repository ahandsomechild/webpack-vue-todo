<template>
  <div id="list">
    <div class="search">
      NOTE&nbsp;&nbsp;|&nbsp;&nbsp;JULY
      <!-- <Input placeholder="搜索..." v-model="key" @keyup.enter.native="search">
          <Icon type="ios-search" @click="search" slot="prefix" />
      </Input> -->
    </div>
    <p :class="{active:activeNote == item}" @click="setActive(index)" v-if="noteList.length>0&&!item.trash&&cur == 'list'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon v-if="!item.favorite" type="ios-star-outline" @click.stop="setfavarite(index)"></Icon>
        <Icon v-if="item.favorite" type="ios-star"  @click.stop="setfavarite(index)"/>
        <Icon v-if="!item.trash" type="ios-trash-outline" @click.stop="settrash(index)"></Icon>
      </span>
    </p>
    <p :class="{active:activeNote == item}" @click.stop="setActive(index)" v-if="noteList.length>0&&!item.trash&&item.favorite&&cur=='favorite'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon v-if="item.favorite" type="ios-star" @click.stop="setfavarite(index)"/>
        <Icon v-if="!item.trash" type="ios-trash-outline" @click.stop="settrash(index)"></Icon>
      </span>
    </p>
    <p :class="{active:activeNote == item}" @click.stop="setActive(index)" v-if="noteList.length>0&&item.trash&&cur=='trash'" v-for="(item,index) in noteList" :key="index">
      <span class="title">{{item.title}}</span>
      <span class="multiple">
        <Icon type="md-return-left" @click.stop="settrash(index)"/>
      </span>
    </p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:-1,
      key:''
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
      var flag = true;
      this.noteList.map(val => {
        console.log(val.trash)
        if(val.trash == false){
          flag = false;
        }
      })
      if(flag == true){
        this.$store.commit('SET_ACTIVE',{})
      }
    },
    setActive(index){
      this.active = index
      this.$store.commit('SET_ACTIVE',this.noteList[index])
    },
    search(){
      if(this.key!=''){
        if(this.cur == 'list'){
          var list = [];
          this.noteList.map(item=>{
            if(item.title.indexOf(this.key)!= -1||item.content.indexOf(this.key)!= -1){
              list.push(item);
            }
          })
          
        }else if(this.cur == 'favorite'){

        }else{

        }
      }
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
    text-align center;
    font-size:20px;
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
