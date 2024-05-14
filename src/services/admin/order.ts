// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 订单确认 PUT /order/confirm */
export async function putOrderConfirm(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/order/confirm', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 订单列表 GET /order/list */
export async function getOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderListParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data: {
      list: {
        id: string;
        user_id: string;
        total_amount: string;
        status: string;
        created_at: string;
        updated_at: null;
        shop_id: string;
        token: null;
        user: {
          id: string;
          phone: any;
          created_at: string;
          updated_at: any;
          role_id: any;
          class: number;
          nickname: string;
          avatar: string;
          login_count: number;
          last_ip: string;
          comment_count: number;
          first_ip: any;
          username: any;
          email: any;
          state: any;
          tokens: number;
          all_tokens: null;
        };
      }[];
      total: number;
      current: number;
      size: number;
    };
  }>('/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
