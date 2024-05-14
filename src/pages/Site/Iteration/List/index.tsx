import { createProTableRequest } from '@/utils/requestUtils';
import { PageContainer, ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import EditModal from './components/EditModal';
import Access from '@/components/Access';
import { Button } from 'antd';
import { getIterationsList } from '@/services/admin/iterations';
import { StatusEnum } from './components/utils';

export default () => {
  const actionRef = useRef<ActionType>();
  const [currentRecord, setCurrentRecord] = useState<API.Admin>();
  const [visible, setVisible] = useState(false);

  const columns: ProColumns<API.Admin>[] = [
    {
      title: '版本号',
      dataIndex: 'version',
    },
    {
      title: '发布内容',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '发布时间',
      dataIndex: 'date',
      width: 180,
      valueType: 'date',
    },
    {
      title: '模块',
      dataIndex: 'modules',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: StatusEnum,
    },
    {
      title: '发布人',
      dataIndex: 'persons',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <Access key="edit" accessCode="SITE_ITERATION_UPDATE">
          <a
            onClick={() => {
              setCurrentRecord(record);
              setVisible(true);
            }}
          >
            编辑
          </a>
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
          <Access key="create" accessCode="SITE_ITERATION_CREATE">
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
        request={createProTableRequest(getIterationsList)}
      />
      <EditModal
        modalVisible={visible}
        currentRecord={currentRecord}
        reload={() => actionRef.current?.reload()}
        setModalVisible={setVisible}
      />
    </PageContainer>
  );
};
