<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>count is {{count}}</div>
  <div>obj is {{obj}}</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0);
    const obj = reactive({ count });
    return { count, obj };
  },
});
</script>
