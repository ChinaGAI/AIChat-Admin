import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import AvatarSelect from './AvatarSelect';
import { putAccount } from '@/services/admin/account';
import { message } from 'antd';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const user = initialState?.currentUser;

  const onFinish = async (values: API.Admin) => {
    await putAccount(values);
    message.success('修改成功');
    setInitialState({
      ...initialState,
      currentUser: {
        ...user,
        ...values,
      },
    });
  };

  return (
    <ProForm
      initialValues={user}
      onFinish={onFinish}
      submitter={{
        searchConfig: {
          submitText: '保存信息',
        },
        submitButtonProps: {},
        resetButtonProps: { hidden: true },
      }}
    >
      <ProForm.Item label="头像" name="avatar">
        <AvatarSelect />
      </ProForm.Item>
      <ProFormText width="md" label="用户名" name="username" />
      <ProFormText width="md" label="昵称" name="nickname" />
      <ProFormText width="md" label="手机号" name="phone_number" />
    </ProForm>
  );
};
