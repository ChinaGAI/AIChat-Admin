import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createProTableRequest } from '@/utils/requestUtils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Link, history } from '@umijs/max';
import Access, { useHasAccess } from '@/components/Access';
import { deletePage, getPageList } from '@/services/admin/page';
import { frontDomain } from '@/utils/const';
import CopyText from '@/utils/copy';

export default () => {
  const actionRef = useRef<ActionType>();

  const handleAdd = () => {
    history.push('/site/page/create');
  };

  const handleDelete = async (id: number) => {
    await deletePage({ id });
    message.success('删除成功！');
    actionRef.current?.reload();
  };

  const columns: ProColumns<API.Page>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '别名',
      dataIndex: 'alias',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: !useHasAccess(['SITE_PAGE_UPDATE', 'SITE_PAGE_DELETE']),
      render: (text, record) => [
        <a key="copy" onClick={() => CopyText(`${frontDomain}/page/${record.alias}`)}>
          复制链接
        </a>,
        <Access key="edit" accessCode="SITE_PAGE_UPDATE">
          <Link to={`/site/page/edit/${record.id}`}>编辑</Link>
        </Access>,
        <Access key="delete" accessCode="SITE_PAGE_DELETE">
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
        search={false}
        actionRef={actionRef}
        columns={columns}
        request={createProTableRequest(getPageList)}
        rowKey="id"
        toolBarRender={() => [
          <Access key="add" accessCode="SITE_PAGE_CREATE">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </Access>,
        ]}
      />
    </PageContainer>
  );
};
