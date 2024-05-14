import { Avatar, List, Switch } from 'antd';
import SettingButton from '../SettingButton';
import ModelsButton from '../ModelsButton';
import { putChatApiKey } from '@/services/admin/apikey';
import { useRequest } from '@umijs/max';
import { useState } from 'react';
import { useReactive } from 'ahooks';

const PlatformItem = ({
  platform,
  drag,
}: {
  platform: API.ChatPlatform;
  drag?: React.ReactNode;
}) => {
  const data = useReactive(platform);
  const [enabled, setEnabled] = useState(platform.enabled === 1);

  const { run, loading } = useRequest(
    (enable) =>
      putChatApiKey({
        id: platform.id,
        enabled: enable ? 1 : 0,
      }),
    { manual: true, onSuccess: () => setEnabled(!enabled) },
  );

  return (
    <List.Item
      actions={[
        <Switch
          key="switch"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          checked={enabled}
          loading={loading}
          onChange={run}
        />,
        <SettingButton key={'setting'} platform={data} />,
        <ModelsButton key={'models'} platform={platform} />,
      ]}
    >
      <List.Item.Meta
        title={platform.name}
        avatar={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {drag}
            <Avatar src={data.icon} />
          </div>
        }
        description={platform.desc}
      />
    </List.Item>
  );
};

export default PlatformItem;
