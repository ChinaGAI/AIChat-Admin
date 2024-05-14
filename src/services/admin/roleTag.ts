// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改菜单 PUT /chat_role_tag */
export async function putChatRoleTag(
  body: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_role_tag', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增菜单 POST /chat_role_tag */
export async function postChatRoleTag(
  body: {
    name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_role_tag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /chat_role_tag */
export async function deleteChatRoleTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChatRoleTagParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string }>('/chat_role_tag', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /chat_role_tag/list */
export async function getChatRoleTagList(options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data: API.AssistantTag[] }>(
    '/chat_role_tag/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 标签排序 POST /chat_role_tag/sort */
export async function postChatRoleTagSort(
  body: {
    sort: { id: string; sort: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/chat_role_tag/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
