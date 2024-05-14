import ImageUpload from '@/components/ImageUpload';
import { putChatApiKey } from '@/services/admin/apikey';
import { ModalForm, ProFormText, ProFormItem } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { assign } from 'lodash';

const SettingButton = ({ platform }: { platform: API.ChatPlatform }) => {
  const onFinish = async (values: Partial<API.ChatPlatform>) => {
    const res = await putChatApiKey({
      id: platform.id,
      ...values,
    });
    assign(platform, values);
    return res.code === 200;
  };

  return (
    <ModalForm
      initialValues={platform}
      title={`配置${platform.name} API KEY`}
      trigger={<Button>API KEY配置</Button>}
      width={450}
      onFinish={onFinish}
    >
      <Alert
        type="warning"
        message="接口地址用于对话请求，请勿轻易修改"
        showIcon
        className="mb-24"
      />
      <ProFormItem label="图标" name="icon">
        <ImageUpload />
      </ProFormItem>
      <ProFormText.Password label="API KEY" name="value" />
      <ProFormText label="API URL" name="api_url" />
    </ModalForm>
  );
};

export default SettingButton;
