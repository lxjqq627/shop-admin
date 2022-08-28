<template>
  {{ d.num.toFixed(0) }}
</template>
  
<script setup>
import { reactive, watch } from 'vue'
import gsap from 'gsap';
const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5, // 动画时长s
    num: props.value
  })
}
AnimateToValue()

watch(() => {
  return props.value
},() => {
  AnimateToValue();
})

</script>
  
<style>
  
</style>