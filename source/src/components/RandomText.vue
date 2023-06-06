<template>
  <span>{{ msg }}</span>
</template>

<script setup>
import { random } from '@/utils/index';
import { computed, defineProps } from 'vue';

const props = defineProps({
  year: String | Number,
  month: String | Number,
  day: String | Number,
  hour: String | Number,
  minute: String | Number,
  second: String | Number,
})

const msg = computed(() => {
  let { year, month, day, hour, minute, second } = props || {};
  year = `${year === '' ? random(currentYear - 5, currentYear + 5): year}`;
  month = `${month === '' ? random(1, 12): month}`;
  day = `${day === '' ? random(1, 12): day}`;
  hour = `${hour === '' ? random(9, 16): hour}`;
  minute = `${minute === '' ? random(0, 59): minute}`;
  second = `${second === '' ? random(0, 59): second}`;

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
})

</script>
