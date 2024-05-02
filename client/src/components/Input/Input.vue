<template>
  <div class="input-group">
    <input type="text" name="email" id="email" placeholder="Search" class="bg-secondary" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="w-5 h-5 fill-none opacity-60 absolute top-1/2 -translate-y-1/2 left-[12px] pointer-events-none"
    >
      <path
        d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped>
.input-group {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  position: relative;
}

.input-group label {
  display: block;
  color: rgba(156, 163, 175, 1);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  color: rgba(243, 244, 246, 1);
}

/* .input-group input:focus {
  border-color: rgba(167, 139, 250);
} */
</style>
