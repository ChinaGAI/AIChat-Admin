import React from 'react';
import { ModalForm, ProFormText, ProFormSwitch } from '@ant-design/pro-components';
import { useLocalStorageState } from 'ahooks';
import { SettingOutlined } from '@ant-design/icons';
import { isDev } from '@/utils/const';
import { FloatButton } from 'antd';

const DevTool = ({ float = false }: { float?: boolean }) => {
  const opt = {
    serializer: (value: string) => value,
    deserializer: (value: string) => value,
  };
  const [apiUrl, setApiUrl] = useLocalStorageState('API_URL', opt);
  const [accessOpen, setAccessOpen] = useLocalStorageState('ACCESS_OPEN', {
    ...opt,
    defaultValue: '1',
  });

  const onFinish = async (values: any) => {
    setApiUrl(values.apiUrl);
    location.reload();
  };
  if (!isDev) return null;

  return (
    <div>
      <ModalForm
        title="DEV设置"
        width={500}
        initialValues={{ apiUrl, accessOpen: accessOpen === '1' }}
        trigger={
          float ? (
            <FloatButton icon={<SettingOutlined />} />
          ) : (
            <div
              style={{
                display: 'flex',
                lineHeight: 26,
              }}
            >
              <SettingOutlined />
            </div>
          )
        }
        onFinish={onFinish}
      >
        <ProFormText name="apiUrl" label="API URL" />
        <ProFormSwitch
          name="accessOpen"
          label="权限开关"
          fieldProps={{
            onChange: (checked) => setAccessOpen(checked ? '1' : '0'),
          }}
        />
      </ModalForm>
    </div>
  );
};

export default DevTool;
