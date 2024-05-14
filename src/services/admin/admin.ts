// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改员工 PUT /system/admin */
export async function putSystemAdmin(
  body: {
    id?: number;
    username?: string;
    nickname?: string;
    role_id?: number;
    departmen_id?: number;
    avatar?: string;
    phone_number?: string;
    state?: number;
    password?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/admin', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 增加员工 POST /system/admin */
export async function postSystemAdmin(
  body: {
    phone_number: string;
    username: string;
    nickname: string;
    role_id: number;
    department_id: number;
    avatar: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 员工列表  GET /system/admin/list */
export async function getSystemAdminList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemAdminListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.Admin[]; total: number; current: number; size: number };
    message: string;
  }>('/system/admin/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
