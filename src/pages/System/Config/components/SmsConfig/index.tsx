import { ModalForm, ProFormText, ProFormItem } from '@ant-design/pro-components';
import { Alert, List, Tag, Typography } from 'antd';
import { useConfig } from '../../List';
import SwitchAction from '../base/SwitchAction';
import CopyText from '@/components/CopyText';

const { Title, Paragraph } = Typography;

const SmsConfig = () => {
  const { data, update } = useConfig();

  return (
    <>
      <List.Item actions={[<SwitchAction key="mail" dataKey="sms_login_enable" />]}>
        <List.Item.Meta
          title={'短信登录'}
          description={
            <>
              <Typography.Paragraph>
                是否开启短信登录验证，
                <span>使用前请先配置短信，</span>
                <ModalForm<API.Config['sms_config']>
                  onFinish={(values) => update('sms_config', values)}
                  initialValues={data?.sms_config}
                  title="配置短信"
                  trigger={<a>点击配置</a>}
                  width={450}
                >
                  <ProFormItem noStyle dependencies={['header']}>
                    {({ getFieldValue }) => {
                      const header = getFieldValue('header');
                      return (
                        <>
                          <Alert
                            style={{ marginBottom: '10px' }}
                            message={
                              <>
                                <div>为什么使用短信宝? 对个人友好，模板审核快</div>
                                <ModalForm
                                  trigger={<a>点此查看配置说明</a>}
                                  title="短信配置说明"
                                  width={850}
                                  submitter={false}
                                >
                                  <p>
                                    短信宝地址:
                                    <a
                                      href="http://www.smsbao.com/reg?r=HX63"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      https://www.smsbao.com
                                    </a>
                                  </p>
                                  <Title level={4}>用户名和API Key获取</Title>
                                  <img src={require('./sms_key.png')} alt="" width={'100%'} />
                                  <Title level={4}>标签配置</Title>
                                  <Paragraph>
                                    标签为短信的头部，如 <Tag>{header}</Tag>
                                    ，设置好后请在模板中添加以下四个模板
                                  </Paragraph>
                                  <CopyText
                                    text={`【${header}】亲爱的用户您正在进行绑定，您的验证码是{code}。有效期为30分钟，如非本人操作，请忽略本短信`}
                                  />
                                  <CopyText
                                    text={`【${header}】亲爱的用户您正在进行重置密码，您的验证码是{code}。有效期为30分钟，如非本人操作，请忽略本短信`}
                                  />
                                  <CopyText
                                    text={`【${header}】亲爱的用户您正在进行注册，您的验证码是{code}。有效期为30分钟，如非本人操作，请忽略本短信`}
                                  />
                                  <CopyText
                                    text={`【${header}】亲爱的用户您正在进行登陆，您的验证码是{code}。有效期为30分钟，如非本人操作，请忽略本短信`}
                                  />
                                  <img src={require('./sms.png')} alt="" width={'100%'} />
                                </ModalForm>
                              </>
                            }
                          />{' '}
                        </>
                      );
                    }}
                  </ProFormItem>
                  <ProFormText label="用户名" name="web_user" />
                  <ProFormText.Password label="API Key" name="web_pwd" />
                  <ProFormText
                    label="签名"
                    name="header"
                    tooltip="设置之后，需要在短信宝添加对应的模板"
                  />
                </ModalForm>
              </Typography.Paragraph>
            </>
          }
        />
      </List.Item>
    </>
  );
};

export default SmsConfig;
