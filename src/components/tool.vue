<template>
  <div id="tool-bar">
    <div class="icon">
      <Icon @click="add" type="md-add"  size="27"/>
    </div>
    <div class="icon">
      <Icon type="md-list" size="27"/>
    </div>
    <div class="icon">
      <Icon type="md-star" size="27"/>
    </div>
    <div class="icon">
      <Icon type="ios-trash" size="27"/>
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
    add(){
      this.$store.commit('ADD_NOTE')
    }
  }
}
</script>
<style lang="stylus" scoped>
#tool-bar{
  width:5%;
  padding-top:20px;
  background: #fff;
  text-align: center;
  float left
  .icon{
    margin:0 0 30px;
  }
}
</style>
