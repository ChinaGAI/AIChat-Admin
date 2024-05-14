// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获商品详情 GET /shop */
export async function getShop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getShopParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Page; message: string }>('/shop', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改商品 PUT /shop */
export async function putShop(
  body: {
    id?: string;
    enable?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/shop', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建商品 POST /shop */
export async function postShop(body: {}, options?: { [key: string]: any }) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/shop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询页面 GET /shop/list */
export async function getShopList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: { list: API.ChatPlan[]; total: number; current: number; size: number };
    message: string;
  }>('/shop/list', {
    method: 'GET',
    ...(options || {}),
  });
}
