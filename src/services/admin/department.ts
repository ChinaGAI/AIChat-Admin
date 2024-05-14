// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改部门 PUT /system/department */
export async function putSystemDepartment(
  body: {
    id: number;
    name?: string;
    leader?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>(
    '/system/department',
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

/** 添加部门 POST /system/department */
export async function postSystemDepartment(
  body: {
    name?: string;
    leader?: string;
    parent_id?: number;
  },
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<{ code: number; data: Record<string, any>; message: string }>(
    '/system/department',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 删除部门 DELETE /system/department */
export async function deleteSystemDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSystemDepartmentParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; data: Record<string, any>; message: string }>(
    '/system/department',
    {
      method: 'DELETE',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 部门列表 GET /system/department/list */
export async function getSystemDepartmentList(options?: { [key: string]: any }) {
  return request<{ code: number; data: API.Department[]; message: string }>(
    '/system/department/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
