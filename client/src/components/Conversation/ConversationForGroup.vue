<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h5 class="text-lg font-bold line-clamp-1">{{ conversation?.name }}</h5>
        <p class="text-textColor text-sm">{{ conversation?.user_ids.length }} members, {{ countUserOnline }} online</p>
      </div>
      <div class="flex items-center justify-center gap-8">
        <button class="text-textColor hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-none">
            <path
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="text-textColor hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-none">
            <path
              d="M2.00589 4.54166C1.905 3.11236 3.11531 2 4.54522 2H7.60606C8.34006 2 9.00207 2.44226 9.28438 3.1212L10.5643 6.19946C10.8761 6.94932 10.6548 7.81544 10.0218 8.32292L9.22394 8.96254C8.86788 9.24798 8.74683 9.74018 8.95794 10.1448C10.0429 12.2241 11.6464 13.9888 13.5964 15.2667C14.008 15.5364 14.5517 15.4291 14.8588 15.0445L15.6902 14.003C16.1966 13.3687 17.0609 13.147 17.8092 13.4594L20.8811 14.742C21.5587 15.0249 22 15.6883 22 16.4238V19.5C22 20.9329 20.8489 22.0955 19.4226 21.9941C10.3021 21.3452 2.65247 13.7017 2.00589 4.54166Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button class="text-textColor hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-current">
            <path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM14,20H4V4H14Zm6,0H16V4h4Z" />
          </svg>
        </button>
        <button class="text-textColor hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-5 h-5 fill-current">
            <path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" />
            <path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" />
            <path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useHomeStore } from '../../stores/modules/homeStore'

export default defineComponent({
  props: {
    conversation: Object
  },
  setup(props) {
    const homeStore = useHomeStore()
    const countUserOnline = ref(0)

    watchEffect(() => {
      const userOnlineCount = props.conversation.user_ids.reduce((count, userId) => {
        if (homeStore.isUserOnline(userId)) {
          count++
        }
        return count
      }, 0)
      countUserOnline.value = userOnlineCount
    })

    return { countUserOnline }
  }
})
</script>

<style scoped></style>
