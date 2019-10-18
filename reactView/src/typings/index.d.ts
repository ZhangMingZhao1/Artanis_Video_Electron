// response 结构
export type Response<T> = {
    [P in keyof T]: T[P];
} & { code: number };

// 接口请求相关类型定义
export { DataResponse } from './getData';

