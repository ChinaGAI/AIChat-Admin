import { putAccountPassword } from '@/services/admin/account';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

export default () => {
  const onFinish = async (values: any) => {
    await putAccountPassword(values);
    message.success('修改成功');
  };

  return (
    <ProForm onFinish={onFinish}>
      <ProFormText.Password
        width="md"
        name="password"
        label="原密码"
        rules={[{ required: true }]}
      />
      <ProFormText.Password
        width="md"
        name="new_password"
        label="新密码"
        rules={[{ required: true }]}
      />
      <ProFormText.Password
        width="md"
        name="repeat_password"
        label="重复密码"
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator: (rule, value) => {
              if (value !== getFieldValue('new_password')) {
                return Promise.reject('两次密码不一致');
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
    </ProForm>
  );
};
