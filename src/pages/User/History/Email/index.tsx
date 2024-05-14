import { getUserHistoryEmail } from '@/services/admin/user';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';

const SMS_SCENE_MAP = {
  reset: {
    text: '重置密码',
    status: 'error',
  },
  signup: {
    text: '注册',
    status: 'success',
  },
  login: {
    text: '登录',
    status: 'processing',
  },
  bind: {
    text: '绑定',
    status: 'processing',
  },
};

export default () => {
  const columns: ProColumns<API.SmsHistory>[] = [
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '验证码',
      dataIndex: 'code',
      render: (code) => <Tag>{code}</Tag>,
      hideInSearch: true,
    },
    {
      title: '触发场景',
      dataIndex: 'scene',
      valueEnum: SMS_SCENE_MAP,
      render: (_, { scene }) => (
        <Tag color={SMS_SCENE_MAP[scene]?.status}>{SMS_SCENE_MAP[scene]?.text}</Tag>
      ),
    },
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '发送时间',
      valueType: 'dateTime',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '过期时间',
      valueType: 'dateTime',
      dataIndex: 'expiration_time',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        search={{
          defaultCollapsed: false,
          collapseRender: () => null,
        }}
        columns={columns}
        rowKey="id"
        request={createProTableRequest(getUserHistoryEmail)}
      />
    </PageContainer>
  );
};
