import { ServiceInfo, getRegistry } from './service-registry-manager';

export const loadService = async (serviceName: string) => {
  const registry = await getRegistry();
  const serviceInfo = registry.services[serviceName];
  if (serviceInfo) {
    // 如果没有加载过这个微服务，就获取其js文件并加载

    const loadedElement = window.customElements.get(serviceName);
    console.log(loadedElement)
    if (!loadedElement) {
      try {
        const moduleObj = await import(serviceInfo.jsUrl);
        console.log(moduleObj)
        window.customElements.define(serviceName, moduleObj.default);
      } catch (e) {
        console.log(e);
        alert('microservice load failed');
      }
    }
    // 如果微服务已经加载，则返回成功信息
    return serviceInfo;
  } else {
    // alert('The requested service is not found.');
    return new Error('service info not found');
  }
};
