<template>
  <div>
    Increment No: {{ increment }} X 2 = {{ multiply }}
    <div><button @click="doAdd">Add</button><button @click="doSubtract">Subtract</button></div>
    <div>Props: {{ props.test }}</div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps<{ test: string }>()
const props = withDefaults(defineProps<{ test: string }>(), {
  test: 'hello'
})
const emit = defineEmits<{
  (e: 'change', id: number): void
}>()

const increment = ref(0)
const multiply = computed(() => increment.value * 2)
watchEffect(() => {
  emit('change', increment.value)
})
function doAdd() {
  increment.value++
}
function doSubtract() {
  increment.value--
}
onMounted(() => {
  increment.value = 10
})
</script>

<style lang="scss"></style>
