<template>
  <div>Chat Layout</div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  created() {
    window.Echo.join('online')
      .here(users => {
        console.log('Online users:', users)
      })
      .joining(user => {
        console.log(user.name + ' joined the channel.')
      })
      .leaving(user => {
        console.log(user.name + ' left the channel.')
      })
  }
})
</script>

<style></style>
