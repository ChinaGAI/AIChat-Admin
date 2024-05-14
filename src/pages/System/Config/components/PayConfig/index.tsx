import {
  ProForm,
  ProFormSegmented,
  ProFormSwitch,
  ProFormDependency,
} from '@ant-design/pro-components';
import { useConfig } from '../../List';
import ImageUpload from '@/components/ImageUpload';
import { Alert, Flex } from 'antd';

const styles = {
  field: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
  },
};

const PayConfig = () => {
  const { data, update } = useConfig();

  return (
    <ProForm<API.Config['pay_config']>
      initialValues={
        data?.pay_config ?? {
          type: 'Person',
          alipay_enable: true,
          wechat_enable: true,
        }
      }
      onFinish={async (values) => {
        await update('pay_config', values);
      }}
      submitter={{
        searchConfig: {
          submitText: '保存',
        },
        render: (_, dom) => dom.pop(),
      }}
    >
      <ProFormSegmented
        label="支付类型"
        name="type"
        valueEnum={{
          Person: '个人支付',
          Enterprise: '企业支付',
        }}
      />
      <ProFormDependency name={['type']}>
        {({ type }) =>
          type === 'Person' && (
            <>
              <Alert
                type="info"
                message="个人支付请上传个人收款二维码，支付成功后让用户添加客服，在后台手动确认"
                className="mb-24"
              />
              <Flex gap={24}>
                <ProForm.Item name="qq_customer" label="QQ客服二维码">
                  <ImageUpload width={250} height={250} />
                </ProForm.Item>
                <ProForm.Item name="wechat_customer" label="微信客服二维码">
                  <ImageUpload width={250} height={250} />
                </ProForm.Item>
              </Flex>
            </>
          )
        }
      </ProFormDependency>

      <Flex gap={24}>
        <div>
          <div style={styles.field}>
            <div style={styles.label}>支付宝</div>
            <ProFormSwitch name="alipay_enable" fieldProps={{ size: 'small' }} noStyle />
          </div>
          <ProFormDependency name={['type']}>
            {({ type }) =>
              type === 'Person' ? (
                <ProForm.Item name="alipay_qrcode">
                  <ImageUpload width={250} height={250} />
                </ProForm.Item>
              ) : (
                <p>企业支付请到配置文件中修改相关配置</p>
              )
            }
          </ProFormDependency>
        </div>
        <div>
          <div style={styles.field}>
            <div style={styles.label}>微信支付</div>
            <ProFormSwitch name="wechat_enable" fieldProps={{ size: 'small' }} noStyle />
          </div>
          <ProFormDependency name={['type']}>
            {({ type }) =>
              type === 'Person' ? (
                <ProForm.Item name="wechat_qrcode">
                  <ImageUpload width={250} height={250} />
                </ProForm.Item>
              ) : (
                <p>企业支付请到配置文件中修改相关配置</p>
              )
            }
          </ProFormDependency>
        </div>
      </Flex>
    </ProForm>
  );
};

export default PayConfig;
