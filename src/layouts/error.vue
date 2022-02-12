<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main>
    <div>[Error Layout]</div>
    <router-view v-bind="$attrs" />
    <div>
      <button @click="router.back()">Back</button>
    </div>
  </main>
</template>
