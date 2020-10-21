import { createApp } from 'vue';

import { defineComponent, ref, reactive } from 'vue';

const App = defineComponent({
  name: 'App',
  setup() {
    const count = ref(0);
    const obj = reactive({ count });
    return () => (
      <>
        <div>
          this is group-detail page
          <a href="./homepage.html">group detail page</a>
        </div>
      </>
    );
  },
});

createApp(App).mount('#app');
