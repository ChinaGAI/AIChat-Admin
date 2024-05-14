// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取文章 GET /post */
export async function getPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Post; message: string }>('/post', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改文章 PUT /post */
export async function putPost(
  body: {
    id?: number;
    title?: string;
    content?: string;
    column?: string;
    sort?: string;
    cover?: string;
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/post', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增文章 POST /post */
export async function postPost(
  body: {
    title?: string;
    content?: string;
    column_id?: string;
    cover?: string;
    desc?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data?: string; message: string }>('/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章 DELETE /post */
export async function deletePost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletePostParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/post', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 文章列表 GET /post/list */
export async function getPostList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.Post[]; total: number; current: number; size: number };
    message: string;
  }>('/post/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
