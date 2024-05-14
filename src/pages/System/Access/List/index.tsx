import Access from '@/components/Access';
import {
  deleteSystemAccess,
  getSystemAccessList,
  postSystemAccess,
  putSystemAccess,
} from '@/services/admin/access';
import {
  PageContainer,
  ProTable,
  ProColumns,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, FormInstance, Popconfirm, Tag, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useHasAccess } from '../../../../components/Access/index';
import TableExpandIcon from '@/components/TableExpandIcon';

const AccessList = () => {
  const { data, run: reload, loading } = useRequest(getSystemAccessList);
  const [currentRecord, setCurrentRecord] = useState<API.Access | null>(null);
  const [visible, setVisible] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const formRef = useRef<FormInstance | null>(null);

  const handleDelete = async (id: number) => {
    await deleteSystemAccess({ id });
    message.success('删除成功！');
    reload();
  };

  const onStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getCodeColor = (code: string) => {
    if (code.includes('CREATE')) return 'success';
    if (code.includes('UPDATE')) return 'processing';
    if (code.includes('DELETE')) return 'error';
    return 'default';
  };

  const columns: ProColumns<API.Access>[] = [
    {
      title: '权限名',
      dataIndex: 'name',
    },
    {
      title: '权限描述',
      dataIndex: 'description',
    },
    {
      title: '权限ID',
      dataIndex: 'id',
    },
    {
      title: '权限码',
      dataIndex: 'code',
      render: (text, { code }) => (code ? <Tag color={getCodeColor(code)}>{text}</Tag> : null),
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      render: (text, { url }) => (url ? <Tag>{text}</Tag> : null),
    },
    {
      title: '操作',
      valueType: 'option',
      hideInTable: !useHasAccess([
        'SYSTEM_ACCESS_CREATE',
        'SYSTEM_ACCESS_UPDATE',
        'SYSTEM_ACCESS_DELETE',
      ]),
      render: (text, record) => [
        <Access key="add" accessCode="SYSTEM_ACCESS_CREATE">
          <a
            onClick={(e) => {
              e.stopPropagation();
              setCurrentRecord(null);
              setCurrentParentId(record.id);
              setVisible(true);
            }}
          >
            新增子权限
          </a>
        </Access>,
        <Access key="edit" accessCode="SYSTEM_ACCESS_UPDATE">
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
        <Access key="delete" accessCode="SYSTEM_ACCESS_DELETE">
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

  const handleAdd = async (values: API.Access) => {
    if (currentParentId) values.parent_id = currentParentId;
    await postSystemAccess(values);
    message.success('添加成功');
    formRef.current?.resetFields();
    setVisible(false);
    reload();
  };

  const handleEdit = async (values: API.Access) => {
    await putSystemAccess({
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
          <Access key="add" accessCode="SYSTEM_ACCESS_CREATE">
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
        <ProFormText name="name" label="权限名" rules={[{ required: true }]} />
        <ProFormText name="description" label="权限描述" />
        <ProFormText name="code" label="权限码" />
        <ProFormText name="url" label="权限接口" />
      </ModalForm>
    </PageContainer>
  );
};

export default AccessList;
