// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改key PUT /chat_api_key */
export async function putChatApiKey(
  body: {
    id: string;
    enabled?: number;
    api_url?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_api_key', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增修改key POST /chat_api_key */
export async function postChatApiKey(
  body: {
    name?: string;
    link?: string;
    target_type?: string;
    parent_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_api_key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除key DELETE /chat_api_key */
export async function deleteChatApiKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChatApiKeyParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/chat_api_key', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /chat_api_key/list */
export async function getChatApiKeyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatApiKeyListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.ChatPlatform[]; total: number; current: number; size: number };
    message: string;
  }>('/chat_api_key/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 排序 POST /chat_api_key/sort */
export async function postChatApiKeySort(
  body: {
    sort: { id: string; sort: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/chat_api_key/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
