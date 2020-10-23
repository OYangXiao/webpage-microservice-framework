import { promises as fs } from 'fs';
import path from 'path';

export default function componentCollect(config = {}) {
  const componentsDir = config.componentsDir || './src/components';
  const resolveExtensions = config.resolveExtensions || ['.js', '.ts', '.tsx', '.jsx', '.vue'];

  return {
    name: 'auto-components-to-input',
    // 首先在开始构建之前从src/components文件夹中读取所有的component
    // 并将每一个component文件夹中的index作为该组件的入口传给rollup config
    async options(options) {
      if (Array.isArray(options)) {
        console.error(
          'Only Object options is allowed,\nentry points are managed by boilerplate,\ncheck auto-components-to-input.js'
        );
        return null;
      }

      // 获取组件路径
      const componentPath = path.resolve(componentsDir);
      console.log(componentPath);
      // 遍历该路径，获取所有文件夹
      const dirsInComponentDir = (await fs.readdir(componentPath))
        .map((filename) => path.join(componentPath, filename))
        .filter(async (filePath) => (await fs.lstat(filePath)).isDirectory());
      const dirPaths = filePaths;
      console.log(dirPaths);
      // 只保留文件夹下有index文件的文件夹
      const dirPathsWithIndex = dirPaths.map(async (dirPath) => {
        const filenamesInDir = await fs.readdir(dirPath);
        // 按照顺序找index文件，匹配到前一个就不再匹配剩下的后缀
        for (const ext of resolveExtensions) {
          if (file) {
          }
        }
        const indexFile = filenamesInDir.find((filename) => {});
      });
      return options;
    },
  };
}
