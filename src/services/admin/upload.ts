// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 图片上传 POST /upload/image */
export async function postUploadImage(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

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

  return request<{ code: number; data: { url: string }; message: string }>('/upload/image', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
