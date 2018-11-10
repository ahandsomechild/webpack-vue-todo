<template>
    <div id="text">
        <!-- {{text}} -->
        <Tool></Tool>
        <List></List>
        <Editor></Editor>
    </div>
</template>

<script>
import Tool from './components/tool.vue'
import List from './components/list.vue'
import Editor from './components/editor.vue'
export default {
    components:{
        Tool,
        List,
        Editor
    },
    data(){
        return {
            text:'hello world'
        }
    }
}
</script>

<style>
    html,body{
        margin:0;
        height:100%;
    }
    #text{
        color:black;
        height:100%;
        width:100%;
        display: flex;
        flex-flow: row nowrap;
    }
</style>