declare module '@vue/web-component-wrapper' {
  const wrap: (vue: any, component: any) => CustomElementConstructor;
  export default wrap;
}
