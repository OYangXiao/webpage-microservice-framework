# webpage-microservice-framework
A webpage microservice framework. 

Support multi front-end lib (e.g. vue, react, flutter, yew, blazor) working together by adopting web-component.

Start from page /pages/web-frame/index.html. This page load service registry info from /pages/web-frame/public/microservice-registry.json. Everytime rebuild microservice you may need to edit this file to load new file.

Build method:
1. vue page: use npm run build:es to build es6 module vue component;
