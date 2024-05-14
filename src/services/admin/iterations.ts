// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取页面详情 GET /iterations */
export async function getIterations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIterationsParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Page; message: string }>('/iterations', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改迭代 PUT /iterations */
export async function putIterations(
  body: {
    id?: number;
    version?: string;
    date?: string;
    content?: string;
    modules?: string;
    persons?: string;
    status?: string;
    title?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/iterations', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加迭代 POST /iterations */
export async function postIterations(
  body: {
    version?: string;
    date?: string;
    content?: string;
    modules?: string;
    persons?: string;
    status?: string;
    title?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/iterations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除页面 DELETE /iterations */
export async function deleteIterations(
  body: {
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/iterations', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询迭代 GET /iterations/list */
export async function getIterationsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getIterationsListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.Page[]; total: number; current: number; size: number };
    message: string;
  }>('/iterations/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
