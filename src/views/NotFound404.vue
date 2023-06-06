<template>
  <n-space>
    <div class="show">not found 404,</div>
    <n-button text>
      <RouterLink to="/">回到首页</RouterLink>
    </n-button>
  </n-space>
</template>

<script setup>
import { RouterLink } from 'vue-router';


</script>

<style scoped lang="less">
.show {
  display: grid;
  place-items: center;
  height: 100%;
}
</style>
