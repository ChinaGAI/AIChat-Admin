import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
  ProFormItem,
} from '@ant-design/pro-components';
import { FormInstance, message } from 'antd';
import { useRef } from 'react';
import {} from '@umijs/max';
import { StatusEnum } from '../utils';
import { postIterations, putIterations } from '@/services/admin/iterations';
import RichTextEditor from '@/components/RichTextEditor';

interface EditModalProps {
  modalVisible: boolean;
  currentRecord?: API.Admin;
  reload: () => void;
  setModalVisible: (visible: boolean) => void;
}

const EditModal = ({ modalVisible, currentRecord, reload, setModalVisible }: EditModalProps) => {
  const formRef = useRef<FormInstance | null>(null);

  const handleAdd = async (values: API.Iteration) => {
    await postIterations(values);
    message.success('添加成功');
    setModalVisible(false);
    reload();
    formRef.current?.resetFields();
  };

  const handleUpdate = async (values: API.Iteration) => {
    await putIterations({ ...values, id: currentRecord!.id });
    message.success('更新成功');
    setModalVisible(false);
    reload();
  };

  return (
    <ModalForm
      formRef={formRef}
      width={800}
      title={currentRecord ? '编辑迭代' : '新增迭代'}
      open={modalVisible}
      initialValues={currentRecord || {}}
      onFinish={currentRecord ? handleUpdate : handleAdd}
      key={currentRecord ? currentRecord.id : 0}
      modalProps={{
        onCancel: () => setModalVisible(false),
      }}
    >
      <ProFormText name="version" label="版本号" rules={[{ required: true }]} />
      <ProFormText name="title" label="标题" rules={[{ required: true }]} />
      <ProFormItem name="content" label="发布内容">
        <RichTextEditor />
      </ProFormItem>
      <ProFormText name="modules" label="模块" />
      <ProFormText name="persons" label="发布人" />
      <ProFormDatePicker name="date" label="发布时间" />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={StatusEnum}
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};

export default EditModal;
