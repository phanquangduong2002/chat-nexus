<template>
  <div class="w-full sm:w-[220px] md:w-[300px] max-h-[100vh] p-5 flex flex-col overflow-hidden" :class="false ? '-ml-[100%] sm:ml-0' : ''">
    <Input />
    <div class="overflow-y-auto custom-scrollbar">
      <div v-for="(conversation, i) in 10" :key="i">
        <!-- <ConversationItem :conversation="conversation" :itemKey="conversation.is_group ? 'group_' + conversation.id : 'user_' + conversation.id" />
         -->
        {{ conversation }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ConversationItem from '@/components/Conversation/ConversationItem.vue'
import Input from '@/components/Input/Input.vue'
export default defineComponent({
  components: { ConversationItem, Input },
  props: {},
  setup(props) {}
})
</script>

<style></style>
