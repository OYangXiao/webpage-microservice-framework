
const pathAliasMap = {
  '@/': '/src/',
};
export default {
  proxy: {
    'vulcan-dev': {
      target: 'http://168.63.128.254:30081',
      changeOrigin: true,
    },
  },
  resolvers: [
    {
      alias(path: string) {
        for (const [slug, res] of Object.entries(pathAliasMap)) {
          if (path.startsWith(slug)) {
            return path.replace(slug, res);
          }
        }
      },
    },
  ],
};
