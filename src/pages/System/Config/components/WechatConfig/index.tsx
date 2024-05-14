import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { List, Typography } from 'antd';
import SwitchAction from '../base/SwitchAction';

const WechatConfig = () => {
  return (
    <>
      <List.Item actions={[<SwitchAction key="switch" dataKey="wechat_login_enable" />]}>
        <List.Item.Meta
          title={'微信登录'}
          description={
            <Typography.Text>
              是否开启密码登录，使用请先配置微信开放平台，{' '}
              <ModalForm title="配置微信开放平台" trigger={<a>点击配置</a>} width={450}>
                <ProFormText label="密匙" />
                <ProFormText label="用户名" />
                <ProFormText label="密码" />
              </ModalForm>
            </Typography.Text>
          }
        />
      </List.Item>
    </>
  );
};

export default WechatConfig;
