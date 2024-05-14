import { postShop, putShop } from '@/services/admin/shop';
import numeral from '@/utils/numeral';
import {
  ModalForm,
  ProFormText,
  ProFormMoney,
  ProFormDigit,
  ProFormDependency,
} from '@ant-design/pro-components';
import { Button } from 'antd';

const EditButton = ({ plan, onSuccess }: { plan?: API.ChatPlan; onSuccess?: () => void }) => {
  const onFinish = async (values: Partial<API.ChatPlan>) => {
    await (plan ? putShop({ id: plan.id, ...values }) : postShop(values));
    onSuccess?.();
    return true;
  };

  return (
    <ModalForm
      width={400}
      trigger={plan ? <a>编辑</a> : <Button type="primary">新增套餐</Button>}
      initialValues={plan}
      onFinish={onFinish}
    >
      <ProFormText label="名称" name="title" rules={[{ required: true }]} />
      <ProFormDependency name={['tokens']}>
        {({ tokens }) => (
          <>
            <ProFormDigit
              name="tokens"
              rules={[{ required: true, message: '请输入Token量' }]}
              fieldProps={{
                formatter: (value) => numeral(value).format('0,0'),
                parser: (value) => numeral(value).value(),
              }}
              label={
                <>
                  Token量/算力
                  <span
                    style={{
                      marginLeft: '8px',
                      fontSize: '12px',
                      color: 'rgba(0, 0, 0, 0.45)',
                    }}
                  >
                    预览: {numeral(tokens).format('0.[00]ac')}算力
                  </span>
                </>
              }
            />
          </>
        )}
      </ProFormDependency>
      <ProFormMoney label="价格" name="price" rules={[{ required: true }]} />
      <ProFormMoney label="原价" name="origin_price" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default EditButton;
