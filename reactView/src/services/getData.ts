import request from '../utils/request';
import { DataResponse } from '@/typings';

// window.smartUtil.post

// 接口请求例子
export const getData = async () => {
    const res = await request<DataResponse>({ 
        url: 'getData', 
        method: 'POST',
        data:{ id: '',} 
    });
    // 发生非业务异常时res为null 非业务异常时直接reject了，不会执行到这 而是到业务代码的catch
    // 详情见`@/utils/request.ts`
    return res && res.data;
};
