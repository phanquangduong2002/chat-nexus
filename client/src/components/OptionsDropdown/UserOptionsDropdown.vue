<template>
  <div class="absolute top-0 right-0 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center rounded-full pl-2 py-1 text-sm font-medium focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-[18px] h-[18px] fill-current">
            <path d="M12,10a2,2,0,1,1-2,2A2,2,0,0,1,12,10ZM4,14a2,2,0,1,0-2-2A2,2,0,0,0,4,14Zm16-4a2,2,0,1,0,2,2A2,2,0,0,0,20,10Z" />
          </svg>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="absolute -right-1 top-1 z-[50] mt-4 py-[6px] w-[140px] flex flex-col bg-gray-900 rounded-lg focus:outline-none">
          <div class="px-[6px]">
            <MenuItem>
              <button @click="onBlockUser" class="group w-full rounded-md px-2 py-2 text-sm text-white hover:bg-black/40">
                <div v-if="conversation?.blocked_at" class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 10V7C5.5 5.27609 6.18482 3.62279 7.40381 2.40381C8.62279 1.18482 10.2761 0.5 12 0.5C13.7239 0.5 15.3772 1.18482 16.5962 2.40381C17.8152 3.62279 18.5 5.27609 18.5 7V10H19C20.6569 10 22 11.3431 22 13V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V13C2 11.3431 3.34315 10 5 10H5.5ZM9.52513 4.52513C10.1815 3.86875 11.0717 3.5 12 3.5C12.9283 3.5 13.8185 3.86875 14.4749 4.52513C15.1313 5.1815 15.5 6.07174 15.5 7V10H8.5V7C8.5 6.07174 8.86875 5.1815 9.52513 4.52513Z"
                      fill="currentColor"
                    />
                  </svg>
                  Unblock User
                </div>
                <div v-if="!conversation?.blocked_at" class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-current">
                    <path
                      d="M9.52513 4.52513C10.1815 3.86875 11.0717 3.5 12 3.5C12.9283 3.5 13.8185 3.86875 14.4749 4.52513C14.7873 4.83751 15.0344 5.20276 15.2078 5.59999L15.4078 6.05825C15.6287 6.56443 16.2181 6.79568 16.7243 6.57477L17.6408 6.17478C18.147 5.95387 18.3783 5.36445 18.1574 4.85827L17.9574 4.40001C17.6355 3.66243 17.1763 2.98389 16.5962 2.40381C15.3772 1.18482 13.7239 0.5 12 0.5C10.2761 0.5 8.62279 1.18482 7.40381 2.40381C6.18482 3.62279 5.5 5.27609 5.5 7V10H5C3.34315 10 2 11.3431 2 13V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V13C22 11.3431 20.6569 10 19 10H8.5V7C8.5 6.07174 8.86875 5.1815 9.52513 4.52513Z"
                      fill="currentColor"
                    />
                  </svg>
                  Block User
                </div>
              </button>
            </MenuItem>
          </div>
          <div class="px-[6px]">
            <MenuItem>
              <button @click="onChangeUserRole" class="group w-full rounded-md px-2 py-2 text-sm text-white hover:bg-black/40">
                <div v-if="!conversation?.is_admin" class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="w-4 h-4 fill-current">
                    <path
                      d="M31.25,7.4a43.79,43.79,0,0,1-6.62-2.35,45,45,0,0,1-6.08-3.21L18,1.5l-.54.35a45,45,0,0,1-6.08,3.21A43.79,43.79,0,0,1,4.75,7.4L4,7.59v8.34c0,13.39,13.53,18.4,13.66,18.45l.34.12.34-.12c.14,0,13.66-5.05,13.66-18.45V7.59Zm-4.57,6.65L15.51,24.9,9.19,18.57a1.4,1.4,0,0,1,2-2L15.54,21,24.73,12a1.4,1.4,0,1,1,2,2Z"
                    />
                    <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                  </svg>
                  Make Admin
                </div>
                <div v-if="conversation?.is_admin" class="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 fill-none">
                    <circle cx="12" cy="6" r="4" fill="currentColor" />
                    <ellipse cx="12" cy="17" rx="7" ry="4" fill="currentColor" />
                  </svg>
                  Make User
                </div>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { blockUser, changeUserRole } from '../../webServices/conversationService'

export default defineComponent({
  components: { Menu, MenuButton, MenuItems, MenuItem },
  props: {
    conversation: Object
  },
  setup() {},
  methods: {
    async onBlockUser() {
      if (!this.conversation.is_user) return

      const res = await blockUser({ conversation_id: conversation.id })
    },
    async onChangeUserRole() {
      if (!this.conversation.is_group) return

      const res = await changeRole({ conversation_id: conversation.id })
    }
  }
})
</script>
