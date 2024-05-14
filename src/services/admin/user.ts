// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** token调整 POST /user/add_token */
export async function postUserAddToken(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postUserAddTokenParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.User[]; total: number; current: number; size: number };
    message: string;
  }>('/user/add_token', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户请求邮件记录 GET /user/history/email */
export async function getUserHistoryEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserHistoryEmailParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.SmsHistory[]; total: number; current: number; size: number };
    message: string;
  }>('/user/history/email', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 点赞记录 GET /user/history/like */
export async function getUserHistoryLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserHistoryLikeParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.PageData; message: string }>('/user/history/like', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录记录 GET /user/history/login */
export async function getUserHistoryLogin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserHistoryLoginParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.PageData; message: string }>('/user/history/login', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户请求短信记录 GET /user/history/sms */
export async function getUserHistorySms(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserHistorySmsParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.SmsHistory[]; total: number; current: number; size: number };
    message: string;
  }>('/user/history/sms', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户列表 GET /user/list */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.User[]; total: number; current: number; size: number };
    message: string;
  }>('/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
