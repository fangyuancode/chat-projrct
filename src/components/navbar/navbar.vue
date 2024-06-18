<template>
  <div class="navbar">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <div class="center">
      <slot name="center">center</slot>
    </div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>

</template>
<script setup>
</script>
<style lang="less" scoped>
.navbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34b2fd;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>