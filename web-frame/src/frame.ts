import { loadService } from './service-loader';

const wrapper = document.getElementById('switch-wrapper');
wrapper?.addEventListener('click', async (e) => {
  const serviceName = (e.srcElement as HTMLElement).dataset['serviceName'];
  if (serviceName) {
    const success = await loadService(serviceName);
    if (success) {
      const serviceElement = document.createElement(serviceName);
      const holder = document.getElementById('microservice-holder');
      holder?.appendChild(serviceElement);
    }
  }
});
