import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0);
    const obj = reactive({ count });
    return () => (
      <>
        <div>aweifjweafi</div>
        <span>dfwefwefawef</span>
      </>
    );
  },
});
