import { putShop } from '@/services/admin/shop';
import { useRequest } from 'ahooks';
import { Switch } from 'antd';

const StatusSwitch = ({ plan }: { plan: API.ChatPlan }) => {
  const { enable } = plan;

  const { run, loading } = useRequest(
    () =>
      putShop({
        id: plan.id,
        enable: enable === 1 ? 0 : 1,
      }),
    {
      manual: true,
      onSuccess() {
        plan.enable = enable === 1 ? 0 : 1;
      },
    },
  );

  return <Switch checked={enable === 1} onChange={run} loading={loading} />;
};

export default StatusSwitch;
