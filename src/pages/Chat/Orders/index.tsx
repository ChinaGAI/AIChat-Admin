import { getOrderList, putOrderConfirm } from '@/services/admin/order';
import numeral from '@/utils/numeral';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { Avatar, Modal, Space } from 'antd';

type Order = Unpack<ReturnType<typeof getOrderList>>['data']['list'][0];

const Orders = () => {
  const columns: ProColumns<Order>[] = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      search: false,
      render: (_, { user }) => (
        <Space>
          <Avatar src={user?.avatar} size="small" />
          {user?.nickname}
        </Space>
      ),
    },
    {
      title: '算力/Token量',
      dataIndex: 'token',
      key: 'token',
      search: false,
      render: (text, { token }) => numeral(token).format('0.[00]ac'),
    },
    {
      title: '金额',
      dataIndex: 'total_amount',
      key: 'total_amount',
      search: false,
    },
    {
      title: '时间',
      dataIndex: 'created_at',
      key: 'time',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        Success: {
          text: '交易成功',
          status: 'Success',
        },
        Pending: {
          text: '交易未完成',
          status: 'Warning',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, { id, status }, i, action) => {
        return status !== 'Success' ? (
          <a
            onClick={() => {
              Modal.confirm({
                title: '是否确认支付成功',
                content: '确认交易后，订单状态将变更为成功，并为用户充值，此操作不可逆',
                onOk: async () => {
                  await putOrderConfirm({ id });
                  action?.reload();
                },
              });
            }}
          >
            确认支付
          </a>
        ) : (
          '-'
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey={'id'}
        request={createProTableRequest(getOrderList)}
      ></ProTable>
    </PageContainer>
  );
};

export default Orders;
