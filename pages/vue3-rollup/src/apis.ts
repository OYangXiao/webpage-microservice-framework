import { getFetch } from '@/utils/ajax';

export const getTest = getFetch <string>('测试代码', 'www.baidu.com');
