import React from 'react';
import {
  ProForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProCard,
  FooterToolbar,
} from '@ant-design/pro-components';
import { getPage, postPage, putPage } from '@/services/admin/page';
import RichTextEditor from '@/components/RichTextEditor';
import { useParams, useRequest } from '@umijs/max';
import { message } from 'antd';
import { frontDomain } from '@/utils/const';

export default () => {
  const { id } = useParams();
  const { data, loading } = useRequest(() => getPage({ id: +id! }), { manual: !id });

  const onFinish = async (values: any) => {
    // 根据是否有id来决定是创建还是更新
    if (id) {
      await putPage({
        id,
        ...values,
      });
      message.success('修改成功');
    } else {
      await postPage(values);
      message.success('创建成功');
    }
    history.back();
  };

  return (
    <PageContainer loading={loading}>
      <ProCard>
        <ProForm
          key={loading.toString()}
          onFinish={onFinish}
          initialValues={data}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            searchConfig: {
              submitText: id ? '保存' : '创建',
            },
            resetButtonProps: { hidden: true },
          }}
        >
          <ProForm.Item noStyle dependencies={[]}>
            {({ getFieldValue }) => {
              return (
                <ProFormText
                  name="alias"
                  width="xl"
                  label="别名"
                  tooltip="用于生成页面的URL"
                  extra={'访问地址：' + frontDomain + '/page/' + getFieldValue('alias')}
                  rules={[{ required: true }]}
                />
              );
            }}
          </ProForm.Item>
          <ProFormText name="title" width="xl" label="标题" rules={[{ required: true }]} />
          <ProFormTextArea name="desc" width="xl" label="描述" />
          <ProForm.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <RichTextEditor />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};
