const serviceInfos = {
  "services": {
    "page-vue": {
      "jsUrl": "http://localhost:5500/pages/vue/dist/page-vue.esm.js",
    },
    "page-react": {
      "jsUrl": "http://localhost:5500/pages/react/public/index.js"
    },
    "page-flutter": {
      "jsUrl": "2",
      "baseApi": "https://www.baidu.com/test"
    },
    "page-rust-yew": {
      "jsUrl": "2",
      "baseApi": "https://www.baidu.com/test"
    },
    "page-csharp-blazor": {
      "jsUrl": "2",
      "baseApi": "https://www.baidu.com/test"
    }
  }
}

export interface ServiceInfo {
  services: { [name: string]: { jsUrl: string; baseApi?: string; } };
  libs: { [name: string]: string };
}
const registry: ServiceInfo & { loadTime: number } = {
  services: {},
  libs: {},
  loadTime: 0,
};

export const getRegistry = async () => {
  // if (!registry.loadTime) {
  //   await fetch('/public/microservice-registry.json')
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json() as Promise<ServiceInfo>;
  //       }
  //     })
  //     .then((serviceInfos) => {
  //       if (serviceInfos) {
          registry.services = serviceInfos.services;
          registry.loadTime = Date.now();
  //       }
  //     });
  // }

  return registry;
};
