import { getUserHistoryLogin } from '@/services/admin/user';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import useUserHistory from '../hooks/useUserHistory';

export default () => {
  const params = useParams();
  const id = params.id;

  const { header, tableRequest } = useUserHistory({
    id,
    title: '登录记录',
    request: getUserHistoryLogin,
  });

  const columns: ProColumns<API.ViewHistory>[] = [
    {
      title: '用户',
      dataIndex: 'nickname',
      hideInSearch: true,
      render: (_, { user }) => user?.nickname,
    },
    {
      title: '最新登录IP',
      dataIndex: 'ip',
      render: (_, { user }) => user?.last_ip,
    },
    {
      title: '登录时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer header={header}>
      <ProTable columns={columns} rowKey="id" request={tableRequest} />
    </PageContainer>
  );
};
