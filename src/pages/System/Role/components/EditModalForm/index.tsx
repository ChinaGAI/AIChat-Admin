import { postSystemRole, putSystemRole } from '@/services/admin/role';
import { ModalForm, ProFormText, ProFormItem } from '@ant-design/pro-components';
import { message } from 'antd';
import AccessSelect, { AccessType } from '../AccessSelect';
import { omit } from 'lodash';

interface Props {
  currentRecord: API.Role | null;
  reload: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

type RoleForm = API.Role & { access: AccessType };

export default ({ currentRecord, reload, visible, setVisible }: Props) => {
  const handleAdd = async (values: RoleForm) => {
    await postSystemRole({
      ...omit(values, 'access'),
      ...values.access,
    });
    message.success('添加成功');
    setVisible(false);
    reload();
  };

  const handleEdit = async (values: RoleForm) => {
    await putSystemRole({
      ...omit(values, 'access'),
      ...values.access,
      id: currentRecord!.id,
    });
    message.success('更新成功');
    setVisible(false);
    reload();
  };

  return (
    <ModalForm
      title={currentRecord ? '编辑角色' : '新建角色'}
      open={visible}
      onOpenChange={setVisible}
      width={600}
      initialValues={
        currentRecord
          ? {
              ...currentRecord,
              access: currentRecord,
            }
          : {}
      }
      onFinish={currentRecord ? handleEdit : handleAdd}
    >
      <ProFormText name="role_name" label="角色名" rules={[{ required: true }]} />
      <ProFormItem name="access" label="权限设置">
        <AccessSelect />
      </ProFormItem>
    </ModalForm>
  );
};
