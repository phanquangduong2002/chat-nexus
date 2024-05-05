<template>
  <div class="min-h-[100vh] min-w-[100vw] flex items-center justify-center">
    <LoaderV1 />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import LoaderV1 from '@/components/Loader/LoaderV1.vue'
export default defineComponent({
  components: { LoaderV1 },
  setup() {},
  created() {
    const router = useRouter()
    router.push('/')
  }
})
</script>

<style></style>
