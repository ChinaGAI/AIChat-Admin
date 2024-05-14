// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 设备统计 GET /analysis/device */
export async function getAnalysisDevice(options?: { [key: string]: any }) {
  return request<{ code: number; data: { os: string; count: number }[]; message: string }>(
    '/analysis/device',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 点赞量统计 GET /analysis/like */
export async function getAnalysisLike(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: {
      total: number;
      tool_total: number;
      post_total: number;
      comment_total: number;
      tool_today_total: number;
      post_today_total: number;
      comment_today_total: number;
    };
    message: string;
  }>('/analysis/like', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录量统计 GET /analysis/login */
export async function getAnalysisLogin(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: { total: number; today_total: number; list: { date: string; today_total: number }[] };
    message: string;
  }>('/analysis/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 位置统计 GET /analysis/position */
export async function getAnalysisPosition(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: {
      province: { province: string; count: number; xy: string }[];
      country: { country: string; count: number; xy: string }[];
    };
  }>('/analysis/position', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 注册统计 GET /analysis/register */
export async function getAnalysisRegister(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: { total: number; yesterday_total: number; today_total: number };
    message: string;
  }>('/analysis/register', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 访问量统计 GET /analysis/visit */
export async function getAnalysisVisit(options?: { [key: string]: any }) {
  return request<{
    data: { uv_total: number; pv_total: number; pv_today_total: number; uv_today_total: number };
    message: string;
    code: string;
  }>('/analysis/visit', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 通过时间查询访问量 GET /analysis/visit_by_time */
export async function getAnalysisVisitByTime(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnalysisVisitByTimeParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: {
      list: { date: string; visit_total: number; uv_count: number }[];
      tool_rank: { url: string; count: number; title: string }[];
      post_rank: { url?: string; count?: number; title?: string }[];
    };
  }>('/analysis/visit_by_time', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 搜索排行 GET /rank/search */
export async function getRankSearch(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: { search: string; count: number; user_count: number }[];
    message: string;
  }>('/rank/search', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 资源访问排行 GET /rank/source */
export async function getRankSource(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRankSourceParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.AnalysisData[]; message: string }>('/rank/source', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
