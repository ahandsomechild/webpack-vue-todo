export default{
  state:{
    notelist:[],
    activeNote:{}
  },
  mutations:{
    ADD_NOTE(state){
      const newNote ={
        title:'自定义标题',
        content:'',
      }
      state.notelist.push(newNote)
      state.activeNote = newNote
    }
  }
}