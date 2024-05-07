<template>
  <div class="flex-1 flex items-start justify-start">
    <div class="h-[100vh] flex-1 px-4 pt-6 pb-4 bg-themeSecondary rounded-r-2xl">
      <ConversationForUser v-if="selectedConversation && selectedConversation?.is_user" :conversation="selectedConversation" :toggleOpen="toggleOpen" />
      <ConversationForGroup v-if="selectedConversation && selectedConversation?.is_group" :conversation="selectedConversation" :toggleOpen="toggleOpen" />
    </div>
    <ConversationAttachment v-if="isOpen" class="w-[30%]" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import ConversationForGroup from '@/components/Conversation/ConversationForGroup.vue'
import ConversationForUser from '@/components/Conversation/ConversationForUser.vue'
import ConversationAttachment from '@/components/Conversation/ConversationAttachment.vue'
export default defineComponent({
  components: { ConversationForGroup, ConversationForUser, ConversationAttachment },
  props: {},
  setup() {
    const homeStore = useHomeStore()

    const selectedConversation = ref(homeStore.selectedConversation)

    const isOpen = ref(false)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    watchEffect(() => {
      selectedConversation.value = homeStore.selectedConversation
      isOpen.value = false
    })

    return {
      selectedConversation,
      isOpen,
      toggleOpen
    }
  },
  methods: {
    async loadData() {}
  },
  created() {
    this.loadData()
  }
})
</script>

<style></style>
