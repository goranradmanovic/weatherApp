<template>
  <TheHeader />
  <main class="flex justify-center">
    <Suspense>
      <router-view />
    </Suspense>
  </main>
</template>

<script setup>
  import TheHeader from '../TheHeader.vue'
</script>
