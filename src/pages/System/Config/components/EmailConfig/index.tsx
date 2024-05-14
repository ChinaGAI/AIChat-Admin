import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Alert, List, Typography } from 'antd';
import { useConfig } from '../../List';
import SwitchAction from '../base/SwitchAction';

const EmailConfig = () => {
  const { data, update } = useConfig();

  return (
    <>
      <List.Item actions={[<SwitchAction key="mail" dataKey="mail_enable" />]}>
        <List.Item.Meta
          title={'邮箱验证'}
          description={
            <>
              <Typography.Paragraph>
                是否开启邮箱验证，开启后用户注册需要邮箱验证，可以在用户管理中查看用户邮箱验证状态，
                <span>使用请先配置邮箱服务器，</span>
                <ModalForm<API.Config['mail_config']>
                  onFinish={(values) => update('mail_config', values)}
                  initialValues={data?.mail_config}
                  title="配置smtp邮箱服务器"
                  trigger={<a>点击配置</a>}
                  width={450}
                >
                  <Alert
                    style={{ marginBottom: '10px' }}
                    message={
                      <div>
                        <div>QQ邮箱填: smtp.qq.com, 163请填: smtp.163.com</div>
                        <ModalForm trigger={<a>点此查看获取教程</a>} onFinish={async () => true}>
                          <p>登录qq邮箱 → 设置 → 账户 → 开启 SMTP 服务 → 把授权码(密码)保存下来</p>
                          <img width={'100%'} src={require('./qq_email.png')} alt="" />
                          <p></p>
                          <p>
                            163企业邮箱设置：客户端设置→开启客户端授权密码→生成授权密码→保存授权密码
                          </p>
                          <img width={'100%'} src={require('./163_email.png')} alt="" />
                        </ModalForm>
                      </div>
                    }
                  ></Alert>
                  <ProFormText label="smtp服务器地址" name="host" />
                  <ProFormText label="smtp用户名" name="user" />
                  <ProFormText.Password label="smtp密码（授权码）" name="pass" />
                </ModalForm>
              </Typography.Paragraph>
            </>
          }
        />
      </List.Item>
    </>
  );
};

export default EmailConfig;
