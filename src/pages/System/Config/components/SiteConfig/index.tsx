import { List, Space, Tag, Typography } from 'antd';
import { useConfig } from '../../List';
import { ModalForm, ProFormText, ProList } from '@ant-design/pro-components';
import { pick, values } from 'lodash';

const SiteConfig = () => {
  const { data, update } = useConfig();

  const dataSource: {
    title: string;
    description: string;
    key: keyof Pick<API.Config, 'website_url' | 'file_url'>;
  }[] = [
    {
      title: '网站域名',
      description: '网站域名',
      key: 'website_url',
    },
    {
      title: '文件访问域名',
      description: '文件域名， 用于生成上传文件的绝对地址',
      key: 'file_url',
    },
  ];

  return (
    <ProList
      itemLayout="horizontal"
      cardProps={{ bodyStyle: { padding: 0 } }}
      dataSource={dataSource}
      metas={{
        title: {
          render: (_, item) => {
            return (
              <Space>
                {item.title}
                <Tag>{data?.[item.key] ?? '未配置'}</Tag>
              </Space>
            );
          },
        },
        description: {
          render: (_, item) => {
            return (
              <Typography.Text ellipsis={{ tooltip: true }}>{item.description}</Typography.Text>
            );
          },
        },
        actions: {
          render: (_, item) => {
            return (
              <ModalForm
                initialValues={data}
                title="文件访问域名"
                trigger={<a>编辑</a>}
                width={400}
                onFinish={(values) => update(item.key, values[item.key])}
              >
                <ProFormText name={item.key} />
              </ModalForm>
            );
          },
        },
      }}
    ></ProList>
  );
};

export default SiteConfig;
