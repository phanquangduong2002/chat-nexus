<template>
  <div class="bg-themeSecondary px-8 pb-4 absolute bottom-0 left-0 right-0 z-[9999]">
    <form @submit.prevent="" class="px-3 py-3 bg-secondary rounded-2xl flex items-start justify-start gap-2">
      <div class="avatar">
        <div class="w-8 rounded-full">
          <img src="../../assets/images/avatar.jpg" alt="Avatar" />
        </div>
      </div>
      <textarea
        class="flex-1 h-8 pt-1 px-2 resize-none bg-transparent border-none outline-none focus:border-none focus:outline-none"
        placeholder="Your message..."
        rows="1"
        v-model="message"
        ref="textarea"
      ></textarea>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(props) {
    const message = ref('')

    return { message }
  },
  watch: {
    message() {
      this.$refs.textarea.style.height = 'auto'
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    }
  },
  methods: {}
})
</script>

<style></style>
