import { getSystemAdminList, putSystemAdmin } from '@/services/admin/admin';
import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import EmployeeEditModal from './components/EmployeeEditModal';
import Access from '@/components/Access';
import { Button, message } from 'antd';
import { getDepartmentOptions, getRoleOptions } from './components/utils';

export default () => {
  const actionRef = useRef<ActionType>();
  const [currentRecord, setCurrentRecord] = useState<API.Admin>();
  const [visible, setVisible] = useState(false);

  const handleDisable = async (record: API.Admin) => {
    const { id, state } = record;
    await putSystemAdmin({ id, state: state === 1 ? 0 : 1 });
    message.success('操作成功');
    actionRef.current?.reload();
  };

  const columns: ProColumns<API.Admin>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'avatar',
      hideInSearch: true,
    },
    {
      title: '员工ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      hideInSearch: true,
    },
    {
      title: '所属部门',
      dataIndex: 'department_id',
      valueType: 'treeSelect',
      hideInTable: true,
      request: getDepartmentOptions,
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      valueType: 'select',
      request: getRoleOptions,
    },
    {
      title: '手机号',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <Access key="edit" accessCode="SYSTEM_EMPLOYEE_UPDATE">
          <a
            onClick={() => {
              setCurrentRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access key="delete" accessCode="SYSTEM_EMPLOYEE_UPDATE">
          <Button type="link" danger={!!record.state} onClick={() => handleDisable(record)}>
            {{ 0: '启用', 1: '禁用' }[record.state]}
          </Button>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        search={{
          defaultCollapsed: false,
          collapseRender: false,
        }}
        toolBarRender={() => [
          <Access key="create" accessCode="SYSTEM_EMPLOYEE_CREATE">
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(undefined);
                setVisible(true);
              }}
            >
              新增
            </Button>
          </Access>,
        ]}
        columns={columns}
        rowKey="id"
        request={createProTableRequest(getSystemAdminList)}
      />
      <EmployeeEditModal
        modalVisible={visible}
        currentRecord={currentRecord}
        reload={() => actionRef.current?.reload()}
        setModalVisible={setVisible}
      />
    </PageContainer>
  );
};
