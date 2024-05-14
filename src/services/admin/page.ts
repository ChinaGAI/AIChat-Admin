// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取页面详情 GET /page */
export async function getPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Page; message: string }>('/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改页面 PUT /page */
export async function putPage(
  body: {
    id?: number;
    content?: string;
    alias?: string;
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/page', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加页面 POST /page */
export async function postPage(
  body: {
    alias?: string;
    desc?: string;
    content?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除页面 DELETE /page */
export async function deletePage(
  body: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/page', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询页面 GET /page/list */
export async function getPageList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.Page[]; total: number; current: number; size: number };
    message: string;
  }>('/page/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
