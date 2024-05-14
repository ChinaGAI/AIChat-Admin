// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改模型 PUT /chat_models */
export async function putChatModels(
  body: {
    id: string;
    name?: string;
    value?: string;
    enabled?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/chat_models', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增模型 POST /chat_models */
export async function postChatModels(
  body: {
    key_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: { id?: string }; message: string }>('/chat_models', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除模型 DELETE /chat_models */
export async function deleteChatModels(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChatModelsParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/chat_models', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 列表 GET /chat_models/list */
export async function getChatModelsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatModelsListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.ChatModel[]; total: number; current: number; size: number };
    message: string;
  }>('/chat_models/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 模型排序 POST /chat_models/sort */
export async function postChatModelsSort(
  body: {
    sort: { id: string; sort: string }[];
  },
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/chat_models/sort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
