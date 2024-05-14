import { useRequest } from '@umijs/max';
import { useConfig } from '../../../List';
import { Switch } from 'antd';

const SwitchAction = ({ dataKey }: { dataKey: keyof API.Config }) => {
  const { data, update } = useConfig();

  const { loading, run } = useRequest((values) => update(dataKey, values), {
    manual: true,
  });

  return (
    <Switch
      key="switch"
      checkedChildren="开启"
      unCheckedChildren="关闭"
      checked={!!data?.[dataKey]}
      loading={loading}
      onChange={run}
    />
  );
};

export default SwitchAction;
