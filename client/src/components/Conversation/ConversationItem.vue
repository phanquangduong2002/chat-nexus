<template>
  <div>{{ conversation.name }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    conversation: Object,
    itemKey: String,
    online: Boolean
  },
  setup(props) {}
})
</script>

<style></style>
