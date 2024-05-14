import React, { useState } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  DragSortTable,
  PageContainer,
  ProFormText,
  ModalForm,
  ProColumns,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {
  deleteColumn,
  getColumnList,
  postColumn,
  postColumnSort,
  putColumn,
} from '@/services/admin/column';
import { useRequest } from '@umijs/max';
import Access, { useHasAccess } from '@/components/Access';
import { frontDomain } from '@/utils/const';

const ColumnList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<API.Column>();
  const {
    data: dataSource = [],
    mutate: setDataSource,
    run,
  } = useRequest(getColumnList, {
    formatResult: (res) => res.data.list,
  });

  const handleAdd = async (values: API.Column) => {
    try {
      await postColumn(values);
      message.success('添加成功');
      setModalVisible(false);
      run({});
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleUpdate = async (values: API.Column) => {
    try {
      await putColumn({ ...values, id: currentRecord!.id });
      message.success('更新成功');
      setModalVisible(false);
      run({});
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteColumn({ id });
    message.success('删除成功');
    run({});
  };

  const handleDragSortEnd = async (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: API.Column[],
  ) => {
    const sort = newDataSource.map((item, index) => {
      return {
        id: item.id,
        sort: newDataSource.length - index,
      };
    });
    setDataSource(newDataSource);
    postColumnSort({ sort: JSON.stringify(sort) });
  };

  const columns: ProColumns<API.Column>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
      hideInSearch: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '栏目名称',
      dataIndex: 'name',
      render: (text, { id }) => (
        <a href={`${frontDomain}/column/${id}`} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      hideInTable: !useHasAccess(['POST_COLUMN_UPDATE', 'POST_COLUMN_DELETE']),
      render: (text, record) => [
        <Access key="edit" accessCode="POST_COLUMN_UPDATE">
          <a
            onClick={() => {
              setCurrentRecord(record);
              setModalVisible(true);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access key="delete" accessCode="POST_COLUMN_DELETE">
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
      <DragSortTable
        toolBarRender={() => [
          <Access key="create" accessCode="POST_COLUMN_CREATE">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setCurrentRecord(undefined);
                setModalVisible(true);
              }}
            >
              新增栏目
            </Button>
          </Access>,
        ]}
        columns={columns}
        dataSource={dataSource}
        search={false}
        rowKey="id"
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
        pagination={false}
        options={false}
      />
      <ModalForm
        width={400}
        title={currentRecord ? '编辑栏目' : '新增栏目'}
        open={modalVisible}
        initialValues={currentRecord}
        onFinish={currentRecord ? handleUpdate : handleAdd}
        key={currentRecord ? currentRecord.id : 0}
        modalProps={{
          onCancel: () => setModalVisible(false),
        }}
      >
        <ProFormText
          name="name"
          label="栏目名称"
          rules={[{ required: true, message: '请输入栏目名称' }]}
        />
        <ProFormTextArea name="desc" label="栏目描述" />
      </ModalForm>
    </PageContainer>
  );
};

export default ColumnList;
