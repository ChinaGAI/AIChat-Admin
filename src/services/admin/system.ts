// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 系统配置 GET /system/config */
export async function getSystemConfig(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.Config; message: string }>('/system/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改系统配置 PUT /system/config */
export async function putSystemConfig(
  body: {
    data: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: API.Config; message: string }>('/system/config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 系统日志 GET /system/logs */
export async function getSystemLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSystemLogsParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    data: { list: API.OperatorLog[]; total: number; current: number; size: number };
    message: string;
  }>('/system/logs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
