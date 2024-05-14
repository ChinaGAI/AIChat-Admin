import { getSystemAdminList } from '@/services/admin/admin';
import { getSystemLogs } from '@/services/admin/system';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';

export default () => {
  const columns: ProColumns<API.OperatorLog>[] = [
    {
      title: '员工ID',
      dataIndex: 'user_id',
      hideInSearch: true,
    },
    {
      title: '员工',
      key: 'user_id',
      hideInTable: true,
      valueType: 'select',
      request: async () => {
        const { data } = await getSystemAdminList({ page: 1, page_size: 1000 });
        return data.list.map(({ id, nickname }) => ({ label: nickname, value: id }));
      },
    },
    {
      title: '员工',
      dataIndex: 'user',
      hideInSearch: true,
      render: (_, { user }) => user?.nickname,
    },
    {
      title: '操作内容',
      dataIndex: 'remark',
      key: 'remark',
      hideInSearch: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable columns={columns} rowKey="id" request={createProTableRequest(getSystemLogs)} />
    </PageContainer>
  );
};
