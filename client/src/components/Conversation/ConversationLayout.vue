<template>
  <div class="min-h-[100vh] flex-1 flex items-start justify-start">
    <ConversationSidebar />
    <ConversationContent />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ConversationSidebar from '@/components/Conversation/ConversationSidebar.vue'
import ConversationContent from '@/components/Conversation/ConversationContent.vue'

export default defineComponent({
  components: { ConversationSidebar, ConversationContent },
  props: {},
  setup() {}
})
</script>

<style></style>
