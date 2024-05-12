<template>
  <div
    class="w-full md:w-[300px] 2xl:w-[360px] h-[100vh] px-2 pt-6 pb-4 bg-themeSecondary flex flex-col rounded-l-2xl overflow-hidden"
    :class="false ? '-ml-[100%] sm:ml-0' : ''"
  >
    <Input :onSearch="onSearch" />
    <div class="mt-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
      <div v-for="(conversation, i) in homeStore.sortedConversations" :key="i" class="px-1">
        <ConversationItem
          :conversation="conversation"
          :itemKey="conversation.is_group ? 'group_' + conversation.id : 'user_' + conversation.id"
          :online="isOnline(conversation)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ConversationItem from '@/components/Conversation/ConversationItem.vue'
import Input from '@/components/Input/Input.vue'

import { useHomeStore } from '../../stores/modules/homeStore'
export default defineComponent({
  components: { ConversationItem, Input },
  props: {},
  setup(props) {
    const homeStore = useHomeStore()

    const onSearch = search => {
      const text = search.toLowerCase()

      const conversationsForSearch = homeStore.conversations.filter(conversation => {
        return conversation.name.toLowerCase().includes(text)
      })
      homeStore.updateSortedConversations(conversationsForSearch)
    }

    const isOnline = conversation => {
      if (conversation.is_user) return !!homeStore.isUserOnline(conversation.id)
      if (conversation.is_group) {
        return conversation.user_ids.some(userId => homeStore.isUserOnline(userId))
      }
    }

    return { homeStore, onSearch, isOnline }
  },
  methods: {}
})
</script>

<style></style>
