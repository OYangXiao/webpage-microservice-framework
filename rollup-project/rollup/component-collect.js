import fs from 'fs';
import path from 'path';

export const componentCollect = (config = {}) => {
  const componentsDir = config.componentsDir || './src/components';
  const resolveExtensions = config.resolveExtensions || ['.js', '.ts', '.tsx', '.jsx', '.vue'];

  // 首先在开始构建之前从src/components文件夹中读取所有的component
  // 并将每一个component文件夹中的index作为该组件的入口传给rollup config

  // 获取组件路径
  const componentsDirPath = path.resolve(componentsDir);
  // 遍历该路径，获取所有文件夹
  return fs
    .readdirSync(componentsDirPath)
    .filter((fileName) => fs.lstatSync(path.join(componentsDirPath, fileName)).isDirectory())
    .map((componentName) => {
      // 只保留文件夹下有index文件的文件夹
      const fileNamesInDir = fs.readdirSync(path.join(componentsDirPath, componentName));
      // 按照顺序找index文件，匹配到前一个就不再匹配剩下的后缀
      for (const ext of resolveExtensions) {
        const indexName = 'index' + ext;
        if (fileNamesInDir.includes(indexName)) {
          return { componentsDirPath, componentName, indexName };
        }
      }
    })
    .filter(Boolean);
};
