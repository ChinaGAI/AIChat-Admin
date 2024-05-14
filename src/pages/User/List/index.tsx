import { getUserList, postUserAddToken } from '@/services/admin/user';
import numeral from '@/utils/numeral';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button, InputNumber, Modal, Space } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const tokens = useRef(0);
  // 变更token
  const onChangeTokens = (id: string, type: 'add' | 'reducing') => {
    Modal.confirm({
      icon: null,
      closable: true,
      centered: true,
      title: `输入需要${type === 'add' ? '增加' : '扣除'}的数量`,
      content: (
        <InputNumber
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          style={{ width: '100%' }}
          defaultValue={0}
          onChange={(value) => {
            console.log(value);
            tokens.current = value ?? 0;
          }}
        />
      ),
      onOk: async () => {
        await postUserAddToken({ user_id: id, type, tokens: tokens.current });
        tokens.current = 0;
        actionRef.current?.reload();
        return true;
      },
    });
  };

  const columns: ProColumns<API.User>[] = [
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'avatar',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '余额',
      dataIndex: 'tokens',
      key: 'tokens',
      render: (text, { tokens, id }) => (
        <Space>
          <Button.Group>
            <Button size="small" type="link" onClick={() => onChangeTokens(id, 'add')}>
              增加
            </Button>
            <Button size="small" type="link" danger onClick={() => onChangeTokens(id, 'reducing')}>
              扣除
            </Button>
          </Button.Group>
          {numeral(tokens).format('0.[00]ac')}
        </Space>
      ),
    },
    {
      title: '注册时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, { id }) => [
        <Link key="view" to={`/user/${id}/history/view`}>
          查看
        </Link>,
        <Link key="assistant" to={`/chat/assistants?user_id=${id}`}>
          助手管理
        </Link>,
        <Link key="login" to={`/user/${id}/history/login`}>
          登录记录
        </Link>,
      ],
    },
  ];

  return (
    <PageContainer title="用户列表">
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        request={createProTableRequest(getUserList)}
      />
    </PageContainer>
  );
};
