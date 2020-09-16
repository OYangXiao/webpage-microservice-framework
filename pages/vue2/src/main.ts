import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import App from './page-vue.vue';

export default wrap(Vue, App);
export const test = function() {
  console.log(1);
};
