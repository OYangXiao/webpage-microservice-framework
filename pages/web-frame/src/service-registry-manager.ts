export interface ServiceInfo {
  services: { [name: string]: { jsUrl: string; baseApi?: string; libs: string[] } };
  libs: { [name: string]: string };
}
const registry: ServiceInfo & { loadTime: number } = {
  services: {},
  libs: {},
  loadTime: 0,
};

export const getRegistry = async () => {
  if (!registry.loadTime) {
    await fetch('/public/microservice-registry.json')
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<ServiceInfo>;
        }
      })
      .then((data) => {
        if (data) {
          registry.libs = data.libs;
          registry.services = data.services;
          registry.loadTime = Date.now();
        }
      });
  }

  return registry;
};
