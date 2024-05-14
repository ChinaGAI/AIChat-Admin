import { deleteSystemRole, getSystemRoleList } from '@/services/admin/role';
import { PageContainer, ProTable, ProColumns } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, message } from 'antd';
import { useState } from 'react';
import EditModalForm from '../components/EditModalForm';
import Access, { useHasAccess } from '@/components/Access';

const RoleList = () => {
  const { data, run: reload, loading } = useRequest(getSystemRoleList);
  const [currentRecord, setCurrentRecord] = useState<API.Role | null>(null);
  const [visible, setVisible] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteSystemRole({ id });
    message.success('删除成功！');
    reload();
  };

  const columns: ProColumns<API.Role>[] = [
    {
      title: '角色名',
      dataIndex: 'role_name',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: !useHasAccess(['SYSTEM_ROLE_UPDATE', 'SYSTEM_ROLE_DELETE']),
      render: (text, record) => [
        <Access key="edit" accessCode="SYSTEM_ROLE_UPDATE">
          <a
            onClick={() => {
              setCurrentRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access key="delete" accessCode="SYSTEM_ROLE_DELETE">
          <Popconfirm key="delete" title="确定删除吗？" onConfirm={() => handleDelete(record.id)}>
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
        loading={loading}
        search={false}
        options={false}
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={false}
        toolBarRender={() => [
          <Access key="add" accessCode="SYSTEM_ROLE_CREATE">
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(null);
                setVisible(true);
              }}
            >
              新建角色
            </Button>
          </Access>,
        ]}
      />
      <EditModalForm
        key={currentRecord ? currentRecord.id : 0}
        visible={visible}
        currentRecord={currentRecord}
        setVisible={setVisible}
        reload={reload}
      />
    </PageContainer>
  );
};

export default RoleList;
