import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class ReactPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.shadowRoot!.appendChild(mountPoint);

    ReactDOM.render(<App />, mountPoint);
  }
}
