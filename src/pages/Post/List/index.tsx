import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Button, Popconfirm, Tag, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deletePost, getPostList, putPost } from '@/services/admin/post';
import { createProTableRequest } from '@/utils/requestUtils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Link, history } from '@umijs/max';
import { getColumnList } from '@/services/admin/column';
import Access, { useHasAccess } from '@/components/Access';
import { frontDomain } from '@/utils/const';

export default () => {
  const actionRef = useRef<ActionType>();

  const handleAdd = () => {
    history.push('/post/create');
  };

  const handleDelete = async (id: number) => {
    await deletePost({ id });
    message.success('删除成功！');
    actionRef.current?.reload();
  };

  const columns: ProColumns<API.Post>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '排序值',
      dataIndex: 'sort',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: (text, record) => (
        <Typography.Text
          editable={{
            onChange: async (value) => {
              await putPost({
                id: record.id,
                sort: value,
              });
              actionRef.current?.reload();
            },
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      render: (text, { id }) => (
        <a href={`${frontDomain}/post/${id}`} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '栏目',
      dataIndex: 'column_id',
      request: async () => {
        const { data } = await getColumnList({ page: 1, page_size: 100 });
        return data.list.map((item) => ({ label: item.name, value: item.id }));
      },
      renderText: (text, record) => <Tag>{record.column?.name}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: !useHasAccess(['POST_UPDATE', 'POST_DELETE']),
      render: (text, record) => [
        <Access key="edit" accessCode="POST_UPDATE">
          <Link to={`/post/edit/${record.id}`}>编辑</Link>
        </Access>,
        <Access key="delete" accessCode="POST_DELETE">
          <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger key="delete">
              删除
            </Button>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        request={createProTableRequest(getPostList)}
        rowKey="id"
        toolBarRender={() => [
          <Access key="add" accessCode="POST_CREATE">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </Access>,
        ]}
      />
    </PageContainer>
  );
};
