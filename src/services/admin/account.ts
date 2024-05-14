// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 当前登录管理员信息 GET /account */
export async function getAccount(options?: { [key: string]: any }) {
  return request<{ code: number; data?: API.Admin; message: string }>('/account', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改信息 PUT /account */
export async function putAccount(
  body: {
    avatar?: string;
    username?: string;
    nickname?: string;
    phone_number?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>('/account', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 PUT /account/password */
export async function putAccountPassword(
  body: {
    /** 原密码 */
    password?: string;
    /** 新密码 */
    new_password?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>(
    '/account/password',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 网站配置 GET /config */
export async function getConfig(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: {
      password_login_enable: boolean;
      wechat_login_enable: boolean;
      sms_login_enable: boolean;
      sms_config: { web_url: string; web_user: string; web_pwd: string; header: string };
      mail_enable: boolean;
      mail_config: { host: string; user: string; pass: string };
      captcha_enable: string;
      captcha_config: { type: 'image' | 'geetest'; id: string; key: string };
      file_url: string;
      website_url: string;
      pay_config: {
        type: 'Person' | 'Enterprise';
        alipay_qrcode: string;
        wechat_qrcode: string;
        alipay_enable: boolean;
        wechat_enable: boolean;
      };
    }[];
    message: string;
  }>('/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 管理登录 POST /login */
export async function postLogin(
  body: {
    username?: string;
    password?: string;
    captcha?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: { token: string }; message: string }>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: body,
    ...(options || {}),
  });
}
