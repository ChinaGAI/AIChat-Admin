// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改菜单 PUT /menu */
export async function putMenu(
  body: {
    id: number;
    name?: string;
    link?: string;
    target_type?: string;
    parent_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/menu', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增菜单 POST /menu */
export async function postMenu(
  body: {
    name?: string;
    link?: string;
    target_type?: string;
    parent_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /menu */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/menu', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 菜单列表 GET /menu/list */
export async function getMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuListParams,
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
  }>('/menu/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 菜单排序 POST /menu/sort */
export async function postMenuSort(
  body: {
    sort?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/menu/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}
