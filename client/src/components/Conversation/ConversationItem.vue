<template>
  <div
    class="p-3 flex items-start justify-start text-xs cursor-pointer rounded-2xl group hover:bg-secondary"
    :class="{
      'bg-secondary':
        homeStore.selectedConversation?.id === conversation.id &&
        (homeStore.selectedConversation?.is_group === conversation.is_group || homeStore.selectedConversation?.is_user === conversation.is_user)
    }"
    @click="homeStore.handleSelectedConversation(conversation)"
  >
    <div
      class="avatar relative"
      :class="{
        'after:absolute after:content after:w-[22.5%] after:h-[22.5%] after:bottom-[5%] after:right-[5%] after:bg-green-500 after:rounded-full': online
      }"
    >
      <div class="w-14 sm:w-10 md:w-14 rounded-full">
        <img src="../../assets/images/avatar.jpg" alt="Avatar" />
      </div>
    </div>
    <div class="ml-3 flex-1 flex flex-col items-start justify-start">
      <div class="w-full relative mb-3 flex items-center justify-between">
        <div class="max-w-[70%] line-clamp-1 text-sm">{{ conversation.name }}</div>
        <div class="ml-2 text-textColor block group-hover:hidden">9:31 am</div>
        <UserOptionsDropdown :conversation="conversation" class="hidden group-hover:block" @click.stop="handleDropdownClick" />
      </div>
      <div class="w-full flex items-center justify-between">
        <p class="max-w-[80%] line-clamp-1 text-textColor">{{ conversation.last_message }}</p>
        <div class="w-5 h-5 flex items-center justify-center bg-tertiary rounded-full">5</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'
import UserOptionsDropdown from '@/components/OptionsDropdown/UserOptionsDropdown.vue'

export default defineComponent({
  components: { UserOptionsDropdown },
  props: {
    conversation: Object,
    itemKey: String,
    online: Boolean
  },
  setup() {
    const homeStore = useHomeStore()

    const handleDropdownClick = event => {
      event.stopPropagation()
    }
    return { homeStore, handleDropdownClick }
  },
  methods: {}
})
</script>

<style scoped></style>
