import { getShopList } from '@/services/admin/shop';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import StatusSwitch from './StatusSwitch';
import EditButton from './EditButton';
import numeral from '@/utils/numeral';

const Plans = () => {
  const columns: ProColumns<API.ChatPlan>[] = [
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '算力/Token量',
      dataIndex: 'tokens',
      valueType: 'digit',
      render: (text, { tokens }) => numeral(tokens).format('0.[00]ac'),
    },
    {
      title: '原价',
      dataIndex: 'origin_price',
      valueType: 'money',
    },
    {
      title: '价格',
      dataIndex: 'price',
      valueType: 'money',
    },
    {
      title: '状态',
      dataIndex: 'enable',
      editable: false,
      render: (text, record) => <StatusSwitch plan={record} />,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <EditButton key={'edit'} plan={record} onSuccess={action?.reload} />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        search={false}
        rowKey={'id'}
        editable={{
          type: 'multiple',
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.save, defaultDoms.cancel];
          },
        }}
        optionsRender={(_, defaultDoms) => [
          <EditButton key={'add'} onSuccess={() => _.action.current?.reload()} />,
          ...defaultDoms,
        ]}
        columns={columns}
        request={createProTableRequest(getShopList)}
      />
    </PageContainer>
  );
};

export default Plans;
