<template>
  <div id="tool-bar">
    <div class="icon">
      <Icon @click="add" type="md-add"  size="27"/>
    </div>
    <div class="icon">
      <Icon type="md-list" size="27" @click="changetab('list')"/>
    </div>
    <div class="icon">
      <Icon type="md-star" size="27" @click="changetab('favorite')"/>
    </div>
    <div class="icon">
      <Icon type="ios-trash" size="27" @click="changetab('trash')"/>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {}
  },
  computed:{
    ...mapState(['notelist'])
  },
  methods:{
    changetab(text){
      this.$store.commit('SWITCH_TAB',text)
    },
    add(){
      this.$store.commit('ADD_NOTE')
      this.$store.commit('SWITCH_TAB','list')
    }
  }
}
</script>
<style lang="stylus" scoped>
#tool-bar{
  width:50px;
  padding-top:20px;
  background: #fff;
  text-align: center;
  float left
  .icon{
    margin:0 0 30px;
  }
}
</style>
