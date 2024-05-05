<template>
  <div>Conversation for user {{ conversation?.name }}</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    conversation: Object
  }
})
</script>

<style></style>
