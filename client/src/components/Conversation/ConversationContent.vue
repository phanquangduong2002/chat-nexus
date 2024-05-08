<template>
  <div class="hidden sm:flex-1 sm:flex items-start justify-start">
    <div class="h-[100vh] flex-1 px-4 pt-6 pb-4 bg-themeSecondary rounded-r-2xl">
      <p v-if="!selectedConversation" class="text-center">Please select conversation to see messages.</p>
      <div v-if="selectedConversation">
        <ConversationHeader :conversation="selectedConversation" :toggleOpen="toggleOpen" />
        <div v-if="localMessages.length === 0" class="min-h-[50vh] flex items-center justify-center">No messages found.</div>
      </div>
    </div>
    <ConversationAttachment v-if="isOpen" class="w-[30%]" />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import ConversationAttachment from '@/components/Conversation/ConversationAttachment.vue'
import ConversationHeader from '@/components/Conversation/ConversationHeader.vue'
export default defineComponent({
  components: { ConversationHeader, ConversationAttachment },
  props: {},
  setup() {
    const homeStore = useHomeStore()

    const selectedConversation = ref(homeStore.selectedConversation)

    const localMessages = ref([])

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
      localMessages,
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
