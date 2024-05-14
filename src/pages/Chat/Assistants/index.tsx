import { deleteChatRole, getChatRoleList } from '@/services/admin/role';
import { PageContainer, ProList, ProListMetas } from '@ant-design/pro-components';
import { Avatar, Popconfirm, Space, Tag, Typography, message } from 'antd';
import Access from '@/components/Access';
import { createProTableRequest } from '@/utils/requestUtils';
import EditAssistantButton from './EditAssistantButton';
import TagModal from './TagModel';
import { getChatRoleTagList } from '@/services/admin/roleTag';
import { useRequest, useSearchParams } from '@umijs/max';
import { values } from 'lodash';
import styles from './style.scss';

const AssistantList = () => {
  const [searchParams] = useSearchParams();

  const handleDelete = async (id: string) => {
    await deleteChatRole({ id });
    message.success('删除成功！');
  };

  const { data: tags = [], refresh, mutate } = useRequest(getChatRoleTagList);

  const tagsRender = (record: API.ChatAssistant) => {
    const tags = [];
    if (record.id === 'system') {
      tags.push(<Tag color="geekblue-inverse">系统默认</Tag>);
    } else if (record.user_id === 'system') {
      tags.push(<Tag color="geekblue">系统创建</Tag>);
    } else {
      tags.push(record.enabled === 0 ? <Tag>私有</Tag> : <Tag color="blue">公开</Tag>);
    }

    if (record.is_delete === 1) {
      tags.push(<Tag color="red">用户已删除</Tag>);
    }
    return tags;
  };

  const metas: ProListMetas<API.ChatAssistant> = {
    title: {
      title: '名称',
      dataIndex: 'name',
      render(dom) {
        return <div style={{ flex: 1, marginLeft: 10 }}>{dom}</div>;
      },
    },
    avatar: {
      search: false,
      dataIndex: 'icon',
    },
    description: {
      title: '标签',
      dataIndex: 'tag_id',
      render(tag) {
        return <Tag>{tag}</Tag>;
      },
      valueType: 'select',
      valueEnum: {
        ...values(tags).reduce(
          (acc, cur) => ({
            ...acc,
            [cur.id]: cur.name,
          }),
          {},
        ),
      },
    },
    content: {
      title: '用户ID',
      dataIndex: 'user_id',
      render(_, record) {
        return (
          <div style={{ paddingBottom: '12px', width: '100%' }}>
            <Typography.Paragraph
              ellipsis={{ rows: 2, tooltip: true }}
              style={{ height: '44px', marginBottom: '8px' }}
            >
              {record.desc}
            </Typography.Paragraph>
            <div style={{ textAlign: 'right', marginRight: '-8px' }}>
              <Space>
                {[
                  <Avatar src={record.user.avatar} size={'small'} key="avatar" />,
                  ...tagsRender(record),
                ]}
              </Space>
            </div>
          </div>
        );
      },
    },
    is_delete: {
      title: '状态',
      dataIndex: 'is_delete',
      valueType: 'select',
      valueEnum: {
        0: '正常',
        1: '已删除',
      },
      fieldProps: { allowClear: false },
    },
    actions: {
      cardActionProps: 'actions',
      search: false,
      render: (_, record, i, action) => {
        return [
          <EditAssistantButton
            tags={tags}
            key={'edit'}
            record={record}
            onSuccess={() => action?.reload()}
          />,
          <Popconfirm
            title="确认删除？"
            description="将永久删除无法找回"
            key={'delete'}
            onConfirm={async () => {
              await handleDelete(record.id);
              action?.reload();
            }}
          >
            <a className="text-danger">删除</a>
          </Popconfirm>,
        ];
      },
    },
  };

  return (
    <PageContainer
      extra={
        <Space>
          <TagModal data={tags ?? []} refresh={refresh} mutate={mutate} />
          <Access key="add" accessCode="SYSTEM_ROLE_CREATE">
            <EditAssistantButton tags={tags} />
          </Access>
        </Space>
      }
    >
      <ProList<API.ChatAssistant>
        options={false}
        search={{
          style: {
            background: '#fff',
            borderRadius: '8px',
          },
          defaultCollapsed: false,
          collapseRender: false,
        }}
        form={{
          initialValues: {
            is_delete: '0',
            user_id: searchParams.get('user_id'),
          },
        }}
        pagination={{
          defaultPageSize: 30,
        }}
        rowKey="id"
        ghost
        itemCardProps={{
          ghost: true,
          bordered: false,
          bodyStyle: {
            padding: '12px',
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
        grid={{ gutter: 16, xs: 2, sm: 2, lg: 4, md: 3, column: 4, xxl: 6 }}
        request={createProTableRequest(getChatRoleList)}
        metas={metas}
        rowClassName={(row: API.ChatAssistant) => (row.is_delete === 1 ? styles.disabled : '')}
      />
    </PageContainer>
  );
};

export default AssistantList;
