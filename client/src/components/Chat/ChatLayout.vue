<template>
  <div>Chat Layout</div>
</template>

<script>
import { defineComponent } from 'vue'
import { echo } from '../../configs/echo'
export default defineComponent({
  created() {
    const echoInstance = echo()
    echoInstance
      .join('online')
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
