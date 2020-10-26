import fs from 'fs';
import path from 'path';

export const componentCollect = (config = {}) => {
  const componentsDir = config.componentsDir || './src/components';
  const resolveExtensions = config.resolveExtensions || ['.js', '.ts', '.tsx', '.jsx', '.vue'];

  // 首先在开始构建之前从src/components文件夹中读取所有的component
  // 并将每一个component文件夹中的index作为该组件的入口传给rollup config

  // 获取组件路径
  const componentPath = path.resolve(componentsDir);
  // 遍历该路径，获取所有文件夹
  const dirsInComponentDir = fs
    .readdirSync(componentPath)
    .map((filename) => path.join(componentPath, filename))
    .filter((filePath) => fs.lstatSync(filePath).isDirectory());
  return dirsInComponentDir
    .map((dirPath) => {
      // 只保留文件夹下有index文件的文件夹
      const filenamesInDir = fs.readdirSync(dirPath);
      // 按照顺序找index文件，匹配到前一个就不再匹配剩下的后缀
      for (const ext of resolveExtensions) {
        const indexName = 'index' + ext;
        if (filenamesInDir.includes(indexName)) {
          return { dirPath, indexName };
        }
      }
    })
    .filter(Boolean);
};
