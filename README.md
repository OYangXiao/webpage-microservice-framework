# webpage-microservice-framework
A webpage microservice framework. Support multi front-end lib (e.g. vue, react, flutter, yew, blazor) working together by adopting web-component.

Index page at pages/web-frame/index.html.

Vue page served through vue-cli-service during development, app enty at /pages/vue/dev/serve.ts. Rollup is used when building to product es6 native module, with a different entrypoint /pages/vue/src/main.ts, export a vue component wrapped as web-component.

