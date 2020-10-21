<template>
  <div>wafewae{{obj}}</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0);
    const obj = reactive({ count });
  },
});
</script>
