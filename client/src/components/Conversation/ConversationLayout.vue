<template>
  <div class="min-h-[100vh] flex-1 flex items-start justify-start bg-themeSecondary rounded-2xl">
    <ConversationSidebar />
    <ConversationContent />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ConversationSidebar from '@/components/Conversation/ConversationSidebar.vue'
import ConversationContent from '@/components/Conversation/ConversationContent.vue'

export default defineComponent({
  components: { ConversationSidebar, ConversationContent },
  props: {}
})
</script>

<style></style>
