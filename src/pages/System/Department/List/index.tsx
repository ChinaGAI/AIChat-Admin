import Access from '@/components/Access';
import {
  deleteSystemDepartment,
  getSystemDepartmentList,
  postSystemDepartment,
  putSystemDepartment,
} from '@/services/admin/department';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, FormInstance, Popconfirm, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useHasAccess } from '../../../../components/Access';
import TableExpandIcon from '@/components/TableExpandIcon';

const DepartmentList = () => {
  const { data, run: reload, loading } = useRequest(getSystemDepartmentList);
  const [currentRecord, setCurrentRecord] = useState<API.Department | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const formRef = useRef<FormInstance | null>(null);

  const handleDelete = async (id: number) => {
    await deleteSystemDepartment({ id });
    message.success('删除成功！');
    reload();
  };

  const onStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const columns: ProColumns<API.Department>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '部门ID',
      dataIndex: 'id',
    },
    {
      title: '部门负责人',
      dataIndex: 'leader',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: !useHasAccess([
        'SYSTEM_DEPARTMENT_CREATE',
        'SYSTEM_DEPARTMENT_UPDATE',
        'SYSTEM_DEPARTMENT_DELETE',
      ]),
      render: (text, record) => [
        <Access key="add" accessCode="SYSTEM_DEPARTMENT_CREATE">
          <a
            onClick={(e) => {
              e.stopPropagation();
              setCurrentRecord(null);
              setCurrentParentId(record.id);
              setVisible(true);
            }}
          >
            新增子部门
          </a>
        </Access>,
        <Access key="edit" accessCode="SYSTEM_DEPARTMENT_UPDATE">
          <a
            onClick={(e) => {
              e.stopPropagation();
              setCurrentRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access key="delete" accessCode="SYSTEM_DEPARTMENT_DELETE">
          <Popconfirm
            title="确定删除吗？"
            onPopupClick={onStopPropagation}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" size="small" danger key="delete" onClick={onStopPropagation}>
              删除
            </Button>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  const handleAdd = async (values: API.Department) => {
    if (currentParentId) values.parent_id = currentParentId;
    await postSystemDepartment(values);
    message.success('添加成功');
    formRef.current?.resetFields();
    setVisible(false);
    reload();
  };

  const handleEdit = async (values: API.Department) => {
    await putSystemDepartment({
      ...values,
      id: currentRecord!.id,
    });
    formRef.current?.resetFields();
    message.success('更新成功');
    setVisible(false);
    reload();
  };

  useEffect(() => {
    if (currentRecord) {
      formRef.current?.setFieldsValue(currentRecord);
    } else {
      formRef.current?.resetFields();
    }
  }, [currentRecord]);

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
        tableStyle={{ cursor: 'pointer' }}
        expandable={{
          expandRowByClick: true,
          expandIcon: TableExpandIcon,
        }}
        toolBarRender={() => [
          <Access key="add" accessCode="SYSTEM_DEPARTMENT_CREATE">
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(null);
                setCurrentParentId(null);
                setVisible(true);
              }}
            >
              新建
            </Button>
          </Access>,
        ]}
      />
      <ModalForm
        formRef={formRef}
        title={currentRecord ? '编辑权限' : '新建权限'}
        open={visible}
        onOpenChange={setVisible}
        width={400}
        onFinish={currentRecord ? handleEdit : handleAdd}
      >
        <ProFormText name="name" label="部门名称" rules={[{ required: true }]} />
        <ProFormText name="leader" label="部门领导" />
      </ModalForm>
    </PageContainer>
  );
};

export default DepartmentList;
