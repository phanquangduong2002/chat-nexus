<template>
  <div class="bg-themeSecondary px-8 pb-4 absolute bottom-0 left-0 right-0 z-[9999]">
    <form @submit.prevent="" class="px-3 py-3 bg-secondary rounded-2xl flex items-end justify-start gap-2">
      <div class="avatar">
        <div class="w-6 rounded-full">
          <img src="../../assets/images/avatar.jpg" alt="Avatar" />
        </div>
      </div>
      <textarea
        class="flex-1 h-6 pt-1 px-2 text-sm max-h-[360px] resize-none bg-transparent border-none outline-none focus:border-none focus:outline-none"
        placeholder="Your message..."
        rows="1"
        v-model="newMessage"
        @keydown="handleTextareaKeyPress"
        ref="textInput"
      ></textarea>
      <button class="mb-1 px-1 text-textColor hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" class="w-4 h-4 fill-current">
          <path
            d="M425.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H667.862v-96.818h242.043l-.004-252.3C585.438 1546.077 329 1274.116 329 943.41V709.983h96.818ZM958.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C522.635 195.475 718.11 0 958.315 0Z"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <button class="mb-1 px-1 text-textColor hover:text-white" @click="triggerPhotoInput">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-none">
          <g>
            <path
              d="M0,0v512h512V0H0z M163.15,120.064c28.778,0,52.101,23.331,52.101,52.11s-23.323,52.11-52.101,52.11   c-28.777,0-52.109-23.331-52.109-52.11S134.372,120.064,163.15,120.064z M454.417,386.525c-1.789,3.325-5.267,5.411-9.05,5.411   H66.633c-3.774,0-7.244-2.067-9.041-5.392c-1.798-3.326-1.627-7.37,0.449-10.525l66.248-100.939   c4.394-6.695,11.657-10.965,19.646-11.531c8-0.566,15.792,2.625,21.094,8.637l45.693,51.786l82.793-125.996   c4.745-7.217,12.807-11.576,21.444-11.585c8.637-0.009,16.708,4.332,21.463,11.54L453.95,375.992   C456.034,379.156,456.215,383.2,454.417,386.525z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>
      <input type="file" accept="image/*" class="hidden" ref="photoInput" @change="handlePhotoChange" />
      <button class="mb-1 px-1 text-textColor hover:text-white" @click="triggerFileInput">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-4 h-4 fill-current">
          <path
            d="M28.777 15.614c-0.136-0.136-0.324-0.22-0.531-0.22-0.206 0-0.393 0.083-0.529 0.218l0-0-11.002 10.958c-1.252 1.407-3.067 2.289-5.088 2.289-1.952 0-3.711-0.822-4.951-2.139l-0.003-0.003c-1.332-1.245-2.162-3.012-2.162-4.974 0-2.011 0.873-3.818 2.261-5.064l0.006-0.006 12.001-12c0.858-0.945 2.092-1.536 3.464-1.536 0.074 0 0.149 0.002 0.222 0.005l-0.010-0c1.288 0.101 2.427 0.668 3.262 1.531l0.001 0.001c0.864 0.837 1.431 1.976 1.53 3.246l0.001 0.018c0.002 0.052 0.003 0.113 0.003 0.175 0 1.382-0.589 2.626-1.529 3.495l-0.003 0.003-11.084 10.998c-0.554 0.741-1.43 1.216-2.416 1.216-0.764 0-1.462-0.285-1.992-0.754l0.003 0.003c-0.444-0.521-0.714-1.203-0.714-1.948 0-1.007 0.494-1.898 1.252-2.445l0.009-0.006 8.001-8.002c0.136-0.136 0.22-0.323 0.22-0.53 0-0.414-0.336-0.75-0.75-0.75-0.207 0-0.395 0.084-0.531 0.22l-7.995 7.996c-1.045 0.829-1.709 2.098-1.709 3.522 0 1.153 0.435 2.205 1.151 3l-0.004-0.004c0.799 0.742 1.873 1.197 3.053 1.197 1.397 0 2.646-0.638 3.47-1.638l0.006-0.008 11.089-11.004c1.217-1.138 1.975-2.753 1.975-4.545 0-0.098-0.002-0.196-0.007-0.293l0 0.014c-0.124-1.669-0.853-3.148-1.967-4.234l-0.001-0.001c-1.087-1.116-2.566-1.846-4.215-1.967l-0.022-0.001c-0.087-0.004-0.188-0.007-0.29-0.007-1.789 0-3.401 0.758-4.531 1.971l-0.003 0.004-12.001 12.001c-1.657 1.527-2.692 3.707-2.692 6.13 0 2.374 0.993 4.515 2.587 6.032l0.003 0.003c1.544 1.561 3.676 2.538 6.037 2.568l0.006 0c2.416-0.039 4.584-1.074 6.115-2.712l0.005-0.005 11-10.956c0.136-0.136 0.221-0.324 0.221-0.531s-0.084-0.394-0.219-0.529l0 0z"
          />
        </svg>
      </button>
      <input type="file" multiple class="hidden" ref="fileInput" @change="handleFileChange" />
      <button class="mb-1 ml-3 px-1 text-white hover:scale-[1.15]">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" class="w-4 h-4 fill-current">
          <path
            d="M15.6,24.9c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l6.1,2.6l1.9,0.8c0.2,0.1,0.5,0.2,0.8,0.2c0.4,0,0.7-0.1,1-0.3  c0.5-0.3,0.9-0.9,1-1.5l1.7-20.8c0.1-0.7-0.3-1.4-0.9-1.8c-0.6-0.4-1.4-0.4-2-0.1L3.4,14.1c-0.7,0.4-1.1,1.1-1,1.9  c0,0.8,0.5,1.4,1.2,1.7l8.4,3.5v6c0,0.8,0.5,1.6,1.3,1.9c0.2,0.1,0.5,0.1,0.7,0.1c0.6,0,1.1-0.2,1.5-0.7l2.4-2.8L15.6,24.9z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect, watch } from 'vue'
export default defineComponent({
  props: {
    conversation: Object
  },
  setup(props) {
    const newMessage = ref('')
    const inputErrorMessage = ref('')
    const messageSending = ref(false)

    const textInput = ref(null)
    const fileInput = ref(null)
    const photoInput = ref(null)

    const adjustTextareaHeight = () => {
      if (textInput.value) {
        if (newMessage.value === '') {
          textInput.value.style.height = '24px'
          return
        }
        textInput.value.style.height = 'auto'
        textInput.value.style.height = textInput.value.scrollHeight + 'px'
      }
    }

    const submitMessage = () => {
      console.log('Message submitted:', newMessage.value)
      newMessage.value = ''
    }

    const handleTextareaKeyPress = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitMessage()
      }
    }

    const triggerFileInput = () => {
      fileInput.value.click()
    }

    const handleFileChange = e => {
      const file = e.target.files[0]
    }

    const triggerPhotoInput = () => {
      photoInput.value.click()
    }

    const handlePhotoChange = e => {
      const file = e.target.files[0]
    }

    watchEffect(() => {
      adjustTextareaHeight()
    })

    return {
      newMessage,
      inputErrorMessage,
      messageSending,
      textInput,
      fileInput,
      photoInput,
      handleTextareaKeyPress,
      triggerFileInput,
      handleFileChange,
      triggerPhotoInput,
      handlePhotoChange
    }
  },
  watch: {
    conversation() {
      this.newMessage = ''
      this.inputErrorMessage = ''
      this.messageSending = false
    }
  },
  methods: {}
})
</script>

<style></style>
