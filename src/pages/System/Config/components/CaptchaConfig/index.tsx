import {
  ModalForm,
  ProFormText,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';
import { List, Typography } from 'antd';
import SwitchAction from '../base/SwitchAction';
import { useConfig } from '../../List';

const CaptchaConfig = () => {
  const { data, update } = useConfig();

  return (
    <>
      <List.Item actions={[<SwitchAction key="switch" dataKey="captcha_enable" />]}>
        <List.Item.Meta
          title={'验证码'}
          description={
            <Typography.Text>
              开启后，发送短信，邮件需要验证码，支持图片验证和极验验证，
              <ModalForm<API.Config['captcha_config']>
                initialValues={data?.captcha_config}
                title="配置验证码"
                trigger={<a>点击配置</a>}
                width={450}
                onFinish={(values) => update('captcha_config', values)}
              >
                <ProFormSelect
                  label="验证方式"
                  name="type"
                  valueEnum={{
                    image: '图片验证',
                    geetest: '极验验证',
                  }}
                />
                <ProFormDependency name={['type']}>
                  {({ type }) => (
                    <div
                      style={{
                        display: type === 'geetest' ? 'block' : 'none',
                      }}
                    >
                      <ProFormText label="验证 ID" name="id" />
                      <ProFormText.Password label="验证 KEY" name="key" />
                    </div>
                  )}
                </ProFormDependency>
              </ModalForm>
            </Typography.Text>
          }
        />
      </List.Item>
    </>
  );
};

export default CaptchaConfig;
