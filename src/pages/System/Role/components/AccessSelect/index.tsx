import { getSystemAccessList } from '@/services/admin/access';
import { useRequest } from '@umijs/max';
import { Spin, Tree, Empty, TreeProps } from 'antd';

export type AccessType = Pick<API.Role, 'access_codes' | 'access_ids'>;
interface Props {
  value?: AccessType;
  onChange?: (value: AccessType) => void;
}

export default ({ value, onChange }: Props) => {
  const formatData = (data: API.Access[]): any[] => {
    return data.map((item: API.Access) => {
      return {
        title: item.name,
        key: item.id,
        code: item.code,
        children: item.children ? formatData(item.children) : [],
      };
    });
  };

  const { data, loading } = useRequest(getSystemAccessList, {
    formatResult: (res) => formatData(res.data),
  });

  const onCheck: TreeProps['onCheck'] = (check, info) => {
    const checkedNodes = info.checkedNodes.filter((item) => item.children?.length === 0);
    onChange?.({
      access_ids: checkedNodes.map((item) => item.key).join(','),
      access_codes: checkedNodes.map((item) => (item as any).code).join(','),
    });
  };

  return (
    <Spin spinning={loading}>
      {data?.length ? (
        <Tree
          treeData={data}
          checkable
          defaultCheckedKeys={value?.access_ids?.split(',').map(Number)}
          onCheck={onCheck}
        ></Tree>
      ) : (
        <Empty />
      )}
    </Spin>
  );
};
