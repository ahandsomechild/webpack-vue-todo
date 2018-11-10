<template>
  <div id="editor">
    <textarea  class="editor"></textarea>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
#editor{
  float left
  .editor{
    resize: none;
    outline: none;
    flex: 1;
    border: none;
    font-size: 18px;
    padding: 32px 16px;
  }
}
</style>


