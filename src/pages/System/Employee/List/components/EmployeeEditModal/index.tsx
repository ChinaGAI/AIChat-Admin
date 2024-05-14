import { postSystemAdmin, putSystemAdmin } from '@/services/admin/admin';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, FormInstance, Tooltip, message } from 'antd';
import { getDepartmentOptions, getRoleOptions } from '../utils';
import { useRef } from 'react';
import { useRequest } from '@umijs/max';

interface EmployeeEditModalProps {
  modalVisible: boolean;
  currentRecord?: API.Admin;
  reload: () => void;
  setModalVisible: (visible: boolean) => void;
}

const EmployeeEditModal = ({
  modalVisible,
  currentRecord,
  reload,
  setModalVisible,
}: EmployeeEditModalProps) => {
  const formRef = useRef<FormInstance | null>(null);

  const handleAdd = async (values: API.Admin) => {
    await postSystemAdmin({
      ...values,
      avatar: '/avatars/1.png',
    });
    message.success('添加成功');
    setModalVisible(false);
    reload();
    formRef.current?.resetFields();
  };

  const handleUpdate = async (values: API.Admin) => {
    await putSystemAdmin({ ...values, id: currentRecord!.id });
    message.success('更新成功');
    setModalVisible(false);
    reload();
  };

  const { run: resetPassword, loading } = useRequest(
    () =>
      putSystemAdmin({
        id: currentRecord!.id,
        password: currentRecord!.phone_number,
      }),
    {
      manual: true,
      formatResult: () => {
        message.success('更新成功');
      },
    },
  );

  return (
    <ModalForm
      formRef={formRef}
      width={400}
      title={currentRecord ? '编辑配置' : '新增配置'}
      open={modalVisible}
      initialValues={currentRecord || {}}
      onFinish={currentRecord ? handleUpdate : handleAdd}
      key={currentRecord ? currentRecord.id : 0}
      modalProps={{
        onCancel: () => setModalVisible(false),
      }}
      submitter={{
        render(props, dom) {
          return [
            dom[0],
            <Tooltip key="reset" title="重置为当前手机号">
              <Button type="primary" loading={loading} onClick={resetPassword}>
                重置密码
              </Button>
            </Tooltip>,
            dom[1],
          ];
        },
      }}
    >
      <ProFormText name="username" label="用户名" rules={[{ required: true }]} />
      <ProFormText name="nickname" label="昵称" rules={[{ required: true }]} />
      <ProFormText
        name="phone_number"
        label="手机号"
        rules={[
          {
            required: true,
            validator(rule, value) {
              if (!value) {
                return Promise.reject('请输入手机号');
              }
              if (!/^1[3456789]\d{9}$/.test(value)) {
                return Promise.reject('请输入正确的手机号');
              }
              return Promise.resolve();
            },
          },
        ]}
      />
      <ProFormSelect
        name="role_id"
        label="角色"
        rules={[{ required: true }]}
        request={getRoleOptions}
      />
      <ProFormTreeSelect
        name="department_id"
        label="部门"
        rules={[{ required: true }]}
        request={getDepartmentOptions}
      />
    </ModalForm>
  );
};

export default EmployeeEditModal;
