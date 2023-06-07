<template>
  <div class="home">
    <n-upload
      multiple
      directory-dnd
      list-type="image-card"
      accept="image/gif,image/jpeg,image/jpg,image/png"
      @update:file-list="handleFileList"
    >
      <n-upload-dragger>
        <div>点击/拖拽</div>
      </n-upload-dragger>
    </n-upload>

    <n-form
      class="form"
      ref="formRef"
      :label-width="80"
      :model="formValue"
    >
      <n-form-item label="顶部文字" path="top">
        <n-input v-model:value="formValue.top" placeholder="输入顶部文字" />
      </n-form-item>
      <n-form-item label="年" path="year">
        <n-input v-model:value="formValue.year" placeholder="输入年,空代表随机,随机范围前后5年" />
      </n-form-item>
      <n-form-item label="月" path="month">
        <n-input v-model:value="formValue.month" placeholder="输入月,空代表随机,随机范围1-12月" />
      </n-form-item>
      <n-form-item label="日" path="day">
        <n-input v-model:value="formValue.day" placeholder="输入日,空代表随机,随机范围1-28日" />
      </n-form-item>
      <n-form-item label="时" path="hour">
        <n-input v-model:value="formValue.hour" placeholder="输入时,空代表随机,随机范围9-16时" />
      </n-form-item>
      <n-form-item label="分" path="minute">
        <n-input v-model:value="formValue.minute" placeholder="输入分,空代表随机,随机范围0-59分" />
      </n-form-item>
      <n-form-item label="秒" path="second">
        <n-input v-model:value="formValue.second" placeholder="输入秒,空代表随机,随机范围0-59秒" />
      </n-form-item>
    </n-form>
    <n-button attr-type="button" @click="submit">
      生成{{ loadItems }}
    </n-button>

    <div class="list" ref="listDom">
      <div class="item" :data-name="name" v-for="{name, src}, index in imgs">
        <div class="item-container">
        <img :src=src alt="" @load="loadItems++">
        <RandomText
            :title="formValue.top"
            :year="formValue.year"
            :month="formValue.month"
            :day="formValue.day"
            :hour="formValue.hour"
            :minute="formValue.minute"
            :second="formValue.second"
            :key="`${formValue.top}_${formValue.year}_${formValue.month}_${formValue.day}_${formValue.hour}_${formValue.minute}_${formValue.second}_${index}`"
          />
      </div>
    </div>

    </div>
    <BaseLoading v-if="loading" />
  </div>
</template>

<script setup>
import BaseLoading from '@/components/BaseLoading.vue';
import RandomText from '@/components/RandomText.vue';
import { debounce, downloadItems, file2base64, promiseObj } from '@/utils/index';
import { nextTick } from 'vue';
const date = new Date();
const currentYear = date.getFullYear();
const imgs = ref({});
const loadItems = ref(0);
const loading = ref(false);
const listDom = ref(null);
const formValue = ref({
  top: '悦然臻城',
  year: `${currentYear}`,
  month: `${date.getMonth() + 1}`,
  day: `${date.getDate()}`,
  hour: '',
  minute: '',
  second: '',
  // hour: `${date.getHours()}`,
  // minute: `${date.getMinutes()}`,
  // second: `${date.getSeconds()}`,
})

const handleFileList = debounce((list) => {
  const obj = list.reduce((total, { file, name }) => ({
    ...total,
    [name]: file2base64(file)
  }), {});

  promiseObj(obj).then(res => {
    imgs.value = Object.keys(res).map(key => ({
      name: key,
      src: res[key]
    }))
  })
})

const submit = () => {
  loading.value = true;
  nextTick(() => {
    const items = listDom.value.querySelectorAll('.item');
    setTimeout(() => {
      downloadItems(items).then(() => {
        loading.value = false
      });
    }, 0);
  })
 }



</script>

<style lang="less" scoped>

.form {
  width: 400px;
  margin-left: 200px;
}

.list {
  // position: fixed;
  // top: 100vh;

  .item {
    display: inline-block;

    .item-container{
      position: relative;

      img {
        width: 200px;
      }
    }

  }
}
</style>
