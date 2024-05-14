// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 列表 GET /chat_item/list */
export async function getChatItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatItemListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: {
      id: number;
      name: string;
      sort: number;
      target_type: 'origin' | 'site';
      link?: any;
      parent_id?: any;
    }[];
    message: string;
  }>('/chat_item/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
