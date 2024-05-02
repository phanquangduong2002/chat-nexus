<template>
  <div class="min-h-[100vh] bg-themeSecondary rounded-2xl">
    <ConversationSidebar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ConversationSidebar from '@/components/Conversation/ConversationSidebar.vue'

export default defineComponent({
  components: { ConversationSidebar },
  props: {}
})
</script>

<style></style>
