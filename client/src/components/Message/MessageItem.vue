<template>
  <div class="chat gap-x-3" :class="message.sender_id === user.id ? 'chat-end' : 'chat-start'">
    <div class="chat-image avatar">
      <div class="w-8 rounded-full">
        <img src="../../assets/images/avatar.jpg" alt="Avatar" />
      </div>
    </div>
    <div class="chat-bubble max-w-[75%] text-sm" :class="message.sender_id === user.id ? 'bg-tertiary' : 'bg-secondary'">
      <div v-if="shouldShowName(message)" class="mb-2 text-sm font-medium opacity-60">{{ message.sender.name }}</div>
      <p>{{ message.message }}</p>
      <time class="mt-2 text-xs opacity-50 float-end">{{ formatDate(message.created_at) }}</time>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { localDeUserObjStore } from '../../configs/connectServer'
import { formatDateLong } from '../../helpers/index'
export default defineComponent({
  props: {
    message: Object,
    previousMessage: Object
  },
  setup() {
    const user = localDeUserObjStore()
    return { user }
  },
  methods: {
    shouldShowName(message) {
      if (!this.previousMessage) {
        return true
      }
      return message.sender.name !== this.previousMessage.sender.name
    },
    formatDate(date) {
      return formatDateLong(date)
    }
  }
})
</script>

<style></style>
