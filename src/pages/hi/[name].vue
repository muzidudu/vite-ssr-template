<template>
  <div>
    <p>Hi {{ props.name }}</p>
    <div v-if="user.otherNames.length">
      <span>Previous Names</span>
      <ul>
        <li v-for="otherName in user.otherNames" :key="otherName">
          <router-link :to="`/hi/${otherName}`" replace>
            {{ otherName }}
          </router-link>
        </li>
      </ul>
    </div>

    <div>
      <button @click="router.back()">Back</button>
      <button @click="doReset">Reset</button>
    </div>
    <p>Refresh this page to see SSR state hydration</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()

if (import.meta.env.SSR) {
  // SSR initial state
  user.previousNames = ['SSR State']
}

user.setNewName(props.name)

const doReset = () => {
  // user.$patch({
  //   previousNames: []
  // })
  user.previousNames = []
}
</script>

<style lang="scss"></style>
