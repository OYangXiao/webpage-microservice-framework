import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class ReactPage extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    ReactDOM.render(<App />, mountPoint);
  }
}
