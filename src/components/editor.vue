<template>
  <div id="editor">
    <div>
      <input size="large" type="text" :value="activeNote.title"/>
    </div>
    <textarea  class="editor"></textarea>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data(){
    return {
    }
  },
  computed:{
    ...mapState([
      'activeNote'
    ]),
    activeNote(){
      return this.$store.state.list.activeNote
    }
  },
  watch:{
    activeNote(val){
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
#editor{
  float left
  padding: 0px 16px;
  .editor{
    resize: none;
    outline: none;
    flex: 1;
    border: none;
    font-size: 18px;
  }
  input{
    border:none;
    font-size:20px;
    border-bottom:1px solid #eaeaea;
    padding:20px 10px 10px;
    outline none
  }
}
</style>



