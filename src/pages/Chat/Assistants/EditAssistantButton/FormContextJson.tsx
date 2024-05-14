import useJsonState from '@/hooks/useJsonState';
import { ProList, ProListMetas, ActionType } from '@ant-design/pro-components';
import { Avatar, Button } from 'antd';
import { last, uniqueId } from 'lodash';
import { useRef } from 'react';

type Context = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
};

const FormContextJson = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [data = [], setData] = useJsonState<Context[]>({
    initialState: value,
    onChange,
  });

  const metas: ProListMetas<Context> = {
    title: {
      dataIndex: 'role',
      title: '角色',
      valueType: 'select',
      valueEnum: {
        assistant: '助手',
        user: '用户',
      },
    },
    avatar: {
      editable: false,
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        assistant: <Avatar src="/avatars/gpt.png" />,
        user: <Avatar src="/avatars/1.png" />,
      },
    },
    description: {
      dataIndex: 'content',
      title: '内容',
    },
    actions: {
      render(dom, row, index, action) {
        return [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable(row.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            className="text-danger"
            onClick={() => {
              const newData = data.slice();
              newData.splice(index, 1);
              setData(newData);
            }}
          >
            删除
          </a>,
        ];
      },
    },
  };

  const ref = useRef<ActionType>();

  return (
    <>
      <ProList<Context>
        rowKey="id"
        dataSource={data}
        metas={metas}
        editable={{
          onSave: async (key, record) => {
            const newData = [...data];
            newData[record.index!] = record;
            setData(newData);
            return true;
          },
        }}
        cardProps={{
          bodyStyle: {
            padding: 0,
          },
        }}
        actionRef={ref}
      ></ProList>
      <Button
        block
        onClick={() => {
          const key = uniqueId();
          ref.current?.addEditRecord({
            key,
            id: key,
            role: last(data)?.role === 'user' ? 'assistant' : 'user',
          });
        }}
      >
        新增
      </Button>
    </>
  );
};

export default FormContextJson;
