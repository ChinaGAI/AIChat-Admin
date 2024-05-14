import { getUserList } from '@/services/admin/user';
import { createProTableRequest } from '@/utils/requestUtils';
import { useRequest } from 'ahooks';

export default function useUserHistory({
  title,
  id,
  request,
}: {
  title: string;
  id?: string;
  request: (params: any) => Promise<{ data: API.PageData }>;
}) {
  const { data } = useRequest(
    async () => {
      const { data } = await getUserList({
        user_id: id,
      });
      return data.list[0];
    },
    {
      ready: !!id,
    },
  );

  const realTitle = data ? ` ${data?.nickname}的${title}` : title;
  const header = {
    title: realTitle,
    breadcrumb: {
      items: [
        {
          path: '/user/list',
          title: '用户管理',
        },
        {
          path: '',
          title: realTitle,
        },
      ],
    },
  };

  return {
    header,
    tableRequest: createProTableRequest(async (params) =>
      request({
        ...params,
        user_id: id,
      }),
    ),
  };
}
