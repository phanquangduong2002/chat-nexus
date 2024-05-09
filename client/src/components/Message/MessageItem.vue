<template>
  <div class="chat chat-start gap-x-4">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img src="../../assets/images/avatar.jpg" alt="Avatar" />
      </div>
    </div>
    <div class="chat-bubble min-h-0 bg-secondary text-sm">
      <div v-if="shouldShowName(message)" class="mb-2 text-base font-bold">{{ message.name }}</div>
      <p>{{ message.message }}</p>
    </div>
  </div>
  <div class="chat chat-end gap-x-4">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img src="../../assets/images/avatar.jpg" alt="Avatar" />
      </div>
    </div>
    <div class="chat-bubble min-h-0 bg-secondary text-sm">
      <div v-if="shouldShowName(message)" class="mb-2 text-base font-bold">{{ message.name }}</div>
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    message: Object,
    previousMessage: Object
  },
  methods: {
    shouldShowName(message) {
      if (!this.previousMessage) {
        return true
      }
      return message.name !== this.previousMessage.name
    }
  }
})
</script>

<style></style>
