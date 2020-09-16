# webpage-microservice-framework
A webpage microservice framework. 

Index page at pages/web-frame/index.html.


Support multi front-end lib (e.g. vue, react, flutter, yew, blazor) working together by adopting web-component.

Start from page /pages/web-frame/index.html. This page load service registry info from /pages/web-frame/public/microservice-registry.json. Everytime rebuild microservice you may need to edit this file to load new file.

Build method:
1. vue page: use npm run build:es to build es6 module vue component;
Vue page served through vue-cli-service during development, app enty at /pages/vue/dev/serve.ts. Rollup is used when building to product es6 native module, with a different entrypoint /pages/vue/src/main.ts, export a vue component wrapped as web-component.
