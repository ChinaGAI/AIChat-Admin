import React from 'react';
import {
  ProForm,
  PageContainer,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProCard,
  FooterToolbar,
} from '@ant-design/pro-components';
import { getPost, postPost, putPost } from '@/services/admin/post';
import RichTextEditor from '@/components/RichTextEditor';
import { useParams, useRequest } from '@umijs/max';
import { message } from 'antd';
import { getColumnList } from '@/services/admin/column';
import ImageUpload from '@/components/ImageUpload';

export default () => {
  const { id } = useParams();
  const { data, loading } = useRequest(() => getPost({ id: +id! }), { manual: !id });

  const onFinish = async (values: any) => {
    console.log(values);
    // 根据是否有id来决定是创建还是更新
    if (id) {
      await putPost({
        id,
        ...values,
      });
      message.success('修改成功');
    } else {
      await postPost(values);
      message.success('创建成功');
    }
  };

  return (
    <PageContainer loading={loading}>
      <ProCard>
        <ProForm
          key={loading.toString()}
          onFinish={onFinish}
          initialValues={{
            ...data,
            column_id: data?.column?.id,
          }}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            searchConfig: {
              submitText: id ? '保存' : '创建',
            },
            resetButtonProps: { hidden: true },
          }}
        >
          <ProForm.Item name="cover" label="封面">
            <ImageUpload width={328} height={213} />
          </ProForm.Item>
          <ProFormText
            name="title"
            label="标题"
            width="xl"
            rules={[{ required: true, message: '请输入标题' }]}
          />
          <ProFormSelect
            name="column_id"
            width="xl"
            label="栏目"
            request={async () => {
              const { data } = await getColumnList({ page: 1, page_size: 100 });
              return data.list.map((item) => ({ label: item.name, value: item.id }));
            }}
            rules={[{ required: true, message: '请选择栏目' }]}
          />
          <ProFormTextArea
            name="desc"
            width="xl"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          />
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
