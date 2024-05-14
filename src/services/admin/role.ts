// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改角色 PUT /chat_role */
export async function putChatRole(
  body: {
    id: number;
    name?: string;
    link?: string;
    target_type?: string;
    parent_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色 POST /chat_role */
export async function postChatRole(
  body: {
    name?: string;
    link?: string;
    target_type?: string;
    parent_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /chat_role */
export async function deleteChatRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChatRoleParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/chat_role', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /chat_role/list */
export async function getChatRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatRoleListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.ChatAssistant[]; total: number; current: number; size: number };
    message: string;
  }>('/chat_role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改角色 PUT /system/role */
export async function putSystemRole(
  body: {
    role_name?: string;
    /** 权限码 */
    access_ids?: string;
    access_codes: string;
    id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 添加角色 POST /system/role */
export async function postSystemRole(
  body: {
    /** 管理员 */
    role_name?: string;
    /** ss_wew */
    access_codes?: string;
    /** 1,55,66 */
    access_ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /system/role */
export async function deleteSystemRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSystemRoleParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/system/role', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 角色列表 GET /system/role/list */
export async function getSystemRoleList(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.Role[]; message: string }>('/system/role/list', {
    method: 'GET',
    ...(options || {}),
  });
}
