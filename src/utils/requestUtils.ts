import { omit } from 'lodash';

export function createProTableRequest<T extends API.PageData>(
  apiFunc: (params: any) => Promise<{ data: T }>,
  formatResult?: (data: T['list']) => any[],
) {
  return async (params: any, sort: any, filter: any) => {
    const { data } = await apiFunc({
      page: params.current,
      page_size: params.pageSize,
      ...omit(params, ['pageSize', 'current']),
      ...sort,
      ...filter,
    });
    return { ...data, data: formatResult ? formatResult(data.list) : data.list, success: true };
  };
}
