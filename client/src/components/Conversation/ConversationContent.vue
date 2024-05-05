<template>
  <div class="flex-1 px-6 pt-6 pb-4">
    <ConversationForUser v-if="selectedConversation && selectedConversation?.is_user" :conversation="selectedConversation" />
    <ConversationForGroup v-if="selectedConversation && selectedConversation?.is_group" :conversation="selectedConversation" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import ConversationForGroup from '@/components/Conversation/ConversationForGroup.vue'
import ConversationForUser from '@/components/Conversation/ConversationForUser.vue'
export default defineComponent({
  components: { ConversationForGroup, ConversationForUser },
  setup() {
    const homeStore = useHomeStore()

    const selectedConversation = ref(homeStore.selectedConversation)

    watchEffect(() => {
      selectedConversation.value = homeStore.selectedConversation
    })

    return {
      selectedConversation
    }
  }
})
</script>

<style></style>
