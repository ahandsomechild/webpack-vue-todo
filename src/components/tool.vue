<template>
  <div id="tool-bar">
    <div class="icon">
      <Icon type="md-list"  size="27"/>
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
export default {
  
}
</script>
<style lang="stylus" scoped>
#tool-bar{
  width:5%;
  padding-top:20px;
  text-align: center;
  float left
  .icon{
    margin:0 0 30px;
  }
}
</style>
