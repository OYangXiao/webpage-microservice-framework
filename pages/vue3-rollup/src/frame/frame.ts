import { createApp } from 'vue';
import App from './frame.vue';

// 创建一个Custom Element，此custom element是该页面的初始节点
// 通过该custome element显示将要显示的内容
class InitFrame extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    shadow.appendChild(wrapper);
  }
  connectedCallback() {
    console.log(this.shadowRoot);
    // createApp(App).mount(this.shadowRoot.)
  }

  disconnectedCallback() {}

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log('change attributes', name, oldValue, newValue);
  }
}

export const defineElement = (name: string) => customElements.define(name, InitFrame);

