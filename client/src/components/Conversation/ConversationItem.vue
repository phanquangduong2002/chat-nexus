<template>
  <div>
    <div>{{ conversation.name }}</div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    conversation: Object,
    itemKey: String
  },
  setup(props) {}
})
</script>

<style></style>
