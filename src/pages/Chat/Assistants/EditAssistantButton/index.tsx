import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormItem,
  ProFormList,
  ProFormSelect,
  ProForm,
} from '@ant-design/pro-components';
import { postChatRole, putChatRole } from '@/services/admin/role';
import ImageUpload from '@/components/ImageUpload';
import { Button } from 'antd';
import { JsonParse } from '@/utils/helper';

const EditRoleButton = ({
  record,
  tags,
  onSuccess,
}: {
  record?: API.ChatAssistant;
  onSuccess?: () => void;
  tags: API.AssistantTag[];
}) => {
  const isCreate = !record;

  const convertFormValues = (values: any) => {
    return {
      ...values,
      suggestions: JSON.stringify(values.suggestions.map((item: any) => item.content)),
    };
  };

  const onFinish = async (values: any) => {
    const data = convertFormValues(values);
    if (record) {
      await putChatRole({
        id: record.id,
        ...data,
      });
    } else await postChatRole(data);
    onSuccess?.();
    return true;
  };

  return (
    <ModalForm
      trigger={
        isCreate ? (
          <Button type="primary">新增</Button>
        ) : (
          <a key="edit" className="text-primary">
            编辑
          </a>
        )
      }
      initialValues={{
        ...record,
        suggestions: JsonParse(record?.suggestions, []).map((content: string) => ({
          content,
        })),
      }}
      onFinish={onFinish}
    >
      <ProFormItem
        name="icon"
        rules={[{ required: true }]}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ImageUpload round />
      </ProFormItem>
      <ProForm.Group>
        <ProFormText width={'md'} label="名称" name="name" rules={[{ required: true }]} />
        <ProFormSelect
          label="标签"
          width={'sm'}
          name="tag_id"
          colon
          options={tags?.map((item) => ({ label: item.name, value: item.id }))}
          rules={[{ required: true }]}
        />
        <ProFormDigit label="排序权重" name="sort_num" width={'xs'} />
      </ProForm.Group>
      <ProFormTextArea label="描述" name="desc" rules={[{ required: true }]} />
      <ProFormTextArea
        label="人设定义"
        name="context"
        placeholder={
          '例子: 你是一个前端工程师，我在开发一个网站，我向你寻求代码时，只给我代码，无需其他解释。回答时给我最有效的解决方案，并且带上中文注释'
        }
        rules={[{ required: true }]}
      />
      <ProFormTextArea label="开场白" name="hello_msg" />
      <ProFormList
        label="建议选项"
        name="suggestions"
        containerStyle={{
          width: '100%',
        }}
      >
        <ProFormText name="content" rules={[{ required: true }]} />
      </ProFormList>
    </ModalForm>
  );
};

export default EditRoleButton;
