<template>
  <div>Chat Layout</div>
</template>

<script>
import { defineComponent } from 'vue'
import { echoInstance } from '../../configs/echo'

export default defineComponent({
  created() {
    const echo = echoInstance()

    echo
      .join('chat')
      .here(users => {
        console.log('Online users:', users)
      })
      .joining(user => {
        console.log(user.name + ' joined the channel.')
      })
      .leaving(user => {
        console.log(user.name + ' left the channel.')
      })
  },
  beforeUnmount() {
    const echo = echoInstance()

    echo.leave('chat')
  }
})
</script>

<style></style>
