<template>
  <div class="min-h-[100vh] bg-themeSecondary rounded-2xl">
    <ConversationSidebar :selectedConversation="selectedConversation" :sortedConversations="sortedConversations" @isUserOnline="isUserOnline" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ConversationSidebar from '@/components/Conversation/ConversationSidebar.vue'

export default defineComponent({
  components: { ConversationSidebar },
  props: {
    conversations: Array,
    selectedConversation: Object,
    localConversations: Array,
    sortedConversations: Array,
    isUserOnline: Function
  }
})
</script>

<style></style>
