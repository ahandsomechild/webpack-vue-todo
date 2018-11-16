import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import list from './vuex/note_list'

Vue.use(Vuex)

const state = {
  notelist:[],
  activeNote:{}
}

const mutations  = {
  ADD_NOTE(state){
    const newNote ={
      title:'自定义标题',
      content:'',
      favorite:false,
      trash:false
    }
    state.notelist.push(newNote)
    state.activeNote = newNote
  },
  SET_ACTIVE(state,text){
    state.activeNote = text;
  },
  EDIT_TITLE(state,text){
    state.activeNote.title = text
  },
  EDIT_NOTE(state,text){
    state.activeNote.content = text
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins:[createPersistedState()]
})