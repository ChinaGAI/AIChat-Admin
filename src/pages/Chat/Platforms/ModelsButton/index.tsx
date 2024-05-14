import { postChatModels, postChatModelsSort, putChatModels } from '@/services/admin/models';
import { ModalForm, ProListMetas, ProList, ActionType } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Alert, Avatar, Button, Switch, Tag } from 'antd';
import { pick } from 'lodash';
import { useRef } from 'react';
import { useModels } from '../useModels';
import { uuid } from '@/utils/helper';
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from 'react-beautiful-dnd';

const ModelsButton = ({ platform }: { platform: API.ChatPlatform }) => {
  const acitonRef = useRef<ActionType>();

  const { models, mutate } = useModels(platform.id);

  const { run: onSaveModel } = useRequest(putChatModels, {
    manual: true,
    formatResult: (res) => res.code === 200,
  });

  const metas: ProListMetas<API.ChatModel> = {
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
      editable: false,
      render: () => <Avatar src={platform.icon} />,
    },
    subTitle: {
      dataIndex: 'magnification',
      valueType: 'digit',
      render: (dom) => <Tag color="geekblue">收费倍率: {dom}</Tag>,
      fieldProps: {
        placeholder: '收费倍率',
        suffix: '倍',
      },
    },
    description: {
      dataIndex: 'value',
      valueType: 'text',
      render: (dom) => <>模型值: {dom}</>,
      fieldProps: {
        placeholder: '模型值',
      },
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    actions: {
      render: (dom, row, index, action) => {
        return [
          <a key={'edit'} onClick={() => action?.startEditable(row.id)}>
            编辑
          </a>,
          <Switch
            key="switch"
            checkedChildren="开启"
            unCheckedChildren="关闭"
            defaultChecked={row.enabled === 1}
            onChange={async (checked) => {
              await onSaveModel({
                ...row,
                enabled: checked ? 1 : 0,
              });
            }}
          />,
        ];
      },
    },
  };

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const items = [...models];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const sort = items.map((item, index) => {
      return {
        id: item.id,
        sort: (items.length - index).toString(),
      };
    });
    postChatModelsSort({ sort });
    mutate(items);
  };

  return (
    <ModalForm
      title={`${platform.name} 模型设置`}
      trigger={<Button>模型设置</Button>}
      submitter={false}
    >
      <Alert
        type="warning"
        className="mb-24"
        message="模型可拖动排序，模型值用于接口模型调用，请勿轻易修改"
        showIcon
      />
      <Button
        block
        onClick={() =>
          acitonRef.current?.addEditRecord(
            {
              id: uuid(),
              key_id: platform.id,
              enabled: 1,
              magnification: 1,
              isCreate: true,
            },
            {
              position: 'top',
            },
          )
        }
      >
        新增
      </Button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={platform.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ProList
                actionRef={acitonRef}
                rowKey={'id'}
                dataSource={models ?? []}
                metas={metas}
                onDataSourceChange={mutate}
                cardProps={{
                  bodyStyle: {
                    padding: 0,
                  },
                }}
                editable={{
                  onSave: async (key, data, _, newLine) => {
                    if (newLine) {
                      const result = await postChatModels({
                        ...pick(data, ['name', 'value']),
                        key_id: platform.id,
                      });
                      data.id = result.data!.id!;
                      return true;
                    } else {
                      return putChatModels(data);
                    }
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

export default ModelsButton;
