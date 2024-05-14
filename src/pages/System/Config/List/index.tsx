import React, { createContext } from 'react';
import { Card, List, Tabs, Typography, message } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { getSystemConfig, putSystemConfig } from '@/services/admin/system';
import WechatConfig from '../components/WechatConfig';
import EmailConfig from '../components/EmailConfig';
import { useRequest } from '@umijs/max';
import style from './style.scss';
import SmsConfig from '../components/SmsConfig';
import SwitchAction from '../components/base/SwitchAction';
import CaptchaConfig from '../components/CaptchaConfig';
import SiteConfig from '../components/SiteConfig';
import PayConfig from '../components/PayConfig';

type UpdateFn = <K extends keyof API.Config>(name: K, value: API.Config[K]) => Promise<boolean>;

type ConfigContextType = {
  data?: API.Config;
  update: UpdateFn;
};

const ConfigContext = createContext<ConfigContextType>({
  update: async () => true,
});

export const useConfig = () => React.useContext<ConfigContextType>(ConfigContext);

const ConfigList = () => {
  const { data, loading, mutate } = useRequest(getSystemConfig);

  const update: UpdateFn = async (name, value) => {
    const newConfig = {
      ...data!,
      [name]: value,
    };
    await putSystemConfig({
      data: JSON.stringify(newConfig),
    });
    mutate(newConfig);
    message.success('更新成功');
    return true;
  };

  return (
    <PageContainer loading={loading} className={style['system-config']}>
      <ConfigContext.Provider value={{ data: data, update }}>
        <Card>
          <Tabs defaultActiveKey="3">
            <Tabs.TabPane tab="登录选项" key="1">
              <List itemLayout="horizontal">
                <List.Item
                  actions={[<SwitchAction key="switch" dataKey="password_login_enable" />]}
                >
                  <List.Item.Meta
                    title={'密码登录'}
                    description={
                      <Typography.Text ellipsis={{ tooltip: true }}>
                        是否开启密码登录, 仅在开启密码登录之后，支持密码注册和找回密码功能
                      </Typography.Text>
                    }
                  />
                </List.Item>
                <SmsConfig />
                <WechatConfig />
                <EmailConfig />
                <CaptchaConfig />
              </List>
            </Tabs.TabPane>

            <Tabs.TabPane tab="网站配置" key="2">
              <SiteConfig />
            </Tabs.TabPane>
            <Tabs.TabPane tab="支付配置" key="3">
              <PayConfig />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </ConfigContext.Provider>
    </PageContainer>
  );
};

export default ConfigList;
