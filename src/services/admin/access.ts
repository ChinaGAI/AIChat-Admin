// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改权限 PUT /system/access */
export async function putSystemAccess(
  body: {
    id: number;
    name?: string;
    api?: string;
    code?: string;
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/access', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增权限 POST /system/access */
export async function postSystemAccess(
  body: {
    name?: string;
    code?: string;
    api?: string;
    parent_id?: number;
    description?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除权限 DELETE /system/access */
export async function deleteSystemAccess(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSystemAccessParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/access', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 权限列表 GET /system/access/list */
export async function getSystemAccessList(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.Access[]; message: string }>('/system/access/list', {
    method: 'GET',
    ...(options || {}),
  });
}
