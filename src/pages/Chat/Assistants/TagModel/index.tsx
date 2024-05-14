import {
  deleteChatRoleTag,
  postChatRoleTag,
  postChatRoleTagSort,
  putChatRoleTag,
} from '@/services/admin/roleTag';
import { uuid } from '@/utils/helper';
import { SettingOutlined } from '@ant-design/icons';
import { ModalForm, ProList, ProListMetas, ActionType } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { pick } from 'lodash';
import { useRef } from 'react';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';
import SemiIcon, { SemiIconName, SemiIconSelect } from './SemiIcon';

const TagModal = ({
  data,
  refresh,
  mutate,
}: {
  data: API.AssistantTag[];
  refresh: () => Promise<API.AssistantTag[]>;
  mutate: (data: API.AssistantTag[]) => void;
}) => {
  const actionRef = useRef<ActionType>();

  const onDelete = async (index: number) => {
    await deleteChatRoleTag({ id: data[index].id });
    await refresh();
  };

  const handleOnDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination) return;
    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const sort = items.map((item, index) => {
      return {
        id: item.id,
        sort: (items.length - index).toString(),
      };
    });
    mutate(items);
    await postChatRoleTagSort({ sort });
  };

  const metas: ProListMetas<API.AssistantTag> = {
    title: {
      dataIndex: 'name',
      fieldProps: {
        placeholder: '名称',
      },
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    avatar: {
      dataIndex: 'icon',
      render: (dom, { icon }) => <SemiIcon name={icon as SemiIconName} size="large" />,
      formItemProps: {
        rules: [{ required: true }],
        style: {
          marginBottom: '0',
          marginBlock: 0,
          marginTop: '3px',
        },
      },
      renderFormItem: () => <SemiIconSelect />,
    },
    actions: {
      render: (dom, row, index, action) => {
        return [
          <a key={'edit'} onClick={() => action?.startEditable(row.id)}>
            编辑
          </a>,
          <Popconfirm key="delete" title="确定删除吗？" onConfirm={() => onDelete(index)}>
            <a className="text-danger">删除</a>
          </Popconfirm>,
        ];
      },
    },
  };

  return (
    <ModalForm
      submitter={false}
      trigger={
        <Button>
          <SettingOutlined />
          标签管理
        </Button>
      }
      title={
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'end',
          }}
        >
          标签管理
          <div
            style={{
              color: '#ccc',
              fontSize: '12px',
            }}
          >
            拖拽排序
          </div>
        </div>
      }
      width={400}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'tag-sort'}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Button
                block
                onClick={() =>
                  actionRef.current?.addEditRecord(
                    {
                      id: uuid(),
                      name: '',
                      sort_num: data.length + 1,
                    },
                    {
                      position: 'top',
                    },
                  )
                }
              >
                新增
              </Button>
              <ProList
                actionRef={actionRef}
                rowKey={'id'}
                dataSource={data ?? []}
                metas={metas}
                cardProps={{
                  bodyStyle: {
                    padding: 0,
                  },
                }}
                editable={{
                  onSave: async (key, data, _, newLine) => {
                    if (newLine) {
                      await postChatRoleTag({
                        ...pick(data, ['name', 'sort_num']),
                      });
                    } else {
                      await putChatRoleTag(data);
                    }
                    await refresh();
                  },

                  actionRender: (row, _, dom) => [dom.save, dom.cancel],
                }}
                // @ts-ignore
                renderItem={(item, _, dom) => (
                  <Draggable key={item.id} draggableId={item.id} index={_}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {dom}
                      </div>
                    )}
                  </Draggable>
                )}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ModalForm>
  );
};

export default TagModal;
