<template>
  <div id="editor">
    <div>
      <input :disabled="isEmptyObject()"   size="large" @input="editTitle" type="text" :value="activeNote.title"/>
    </div>
    <textarea @input="editNote" :value="activeNote.content" class="editor" ></textarea>
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
      return this.$store.state.activeNote
    }
  },
  watch:{
    activeNote(val){
      console.log(val)
    }
  },
  methods:{
    isEmptyObject () {
			for (let key in this.activeNote) {
				return false
			}
			return true
		},
    editTitle(e){
      this.$store.commit('EDIT_TITLE',e.target.value)
    },
    editNote(e){
      this.$store.commit('EDIT_NOTE',e.target.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
#editor{
  flex:1;
  padding: 0px 16px;
  .editor{
    resize: none;
    outline: none;
    width:100%;
    border: none;
    font-size: 18px;
  }
  input{
    border:none;
    width 100%
    font-size:20px;
    border-bottom:1px solid #eaeaea;
    padding:20px 10px 10px;
    outline none
  }
  textarea{
    width:100%;
    padding:10px 10px 10px;
  }
}
</style>



