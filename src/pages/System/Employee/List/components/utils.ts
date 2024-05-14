import { getSystemDepartmentList } from '@/services/admin/department';
import { getSystemRoleList } from '@/services/admin/role';

export const getRoleOptions = async () => {
  const { data } = await getSystemRoleList();
  return data.map((item) => ({ label: item.role_name, value: item.id }));
};

export const getDepartmentOptions = async () => {
  const { data } = await getSystemDepartmentList();
  const buildTree = (data: API.Department[]): any[] => {
    return data.map((item) => ({
      title: item.name,
      value: item.id,
      children: buildTree(item.children),
    }));
  };

  return buildTree(data);
};
