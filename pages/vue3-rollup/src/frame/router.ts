const routes: Array<{ path: string; component: string }> = [];

const route = {
  mode: 'hash',
  mountPoint: null as null | HTMLElement,
  current: null as typeof routes[0] | null,
};

const init = (configs: { mountPoint: string | HTMLElement }) => {
  let _mountPoint = null;
  if (typeof configs.mountPoint === 'string') {
    console.log(document);
  }
};

const addRoute = (oneRoute: typeof routes[0]) => {
  routes.push(oneRoute);
};

const getFragment = () => {
  const match = window.location.href.match(/#(.*)$/);
  const fragment = match ? match[1] : '';
  return fragment.toString().replace(/\/$/, '').replace(/^\//, '');
};

const goto = (path = '') => {
  window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
};

window.addEventListener(
  'hashchange',
  () => {
    const newPath = getFragment();
    const match = routes.find((el) => el.path === newPath);
    if (match) {
      route.current = match;
      route.current;
    }
  },
  false
);

export const router = { routes, route, init, addRoute, goto };
