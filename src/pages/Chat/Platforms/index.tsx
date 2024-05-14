import { getChatApiKeyList, postChatApiKeySort } from '@/services/admin/apikey';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Card, List } from 'antd';
import PlatformItem from './PlatformItem';
import { ModelsContextProvider } from './useModels';
import { RiDraggable } from '@remixicon/react';
import DragSort from '@/components/DragSort';

const Platforms = () => {
  const {
    data = [],
    loading,
    mutate,
  } = useRequest(getChatApiKeyList, {
    formatResult: (res) => res.data.list,
  });

  const onDragSort = (data: API.ChatPlatform[]) => {
    const sort = data.map((item, index) => {
      return {
        id: item.id,
        sort: (data.length - index).toString(),
      };
    });
    postChatApiKeySort({ sort });
    mutate(data);
  };

  return (
    <ModelsContextProvider>
      <PageContainer extra={<Button>帮助文档</Button>}>
        <Card loading={loading}>
          <List itemLayout="horizontal">
            <DragSort
              data={data}
              onDragSort={onDragSort}
              renderItem={(item, dragHandleProps) => (
                <PlatformItem
                  platform={item}
                  drag={
                    <div {...dragHandleProps}>
                      <RiDraggable />
                    </div>
                  }
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </List>
        </Card>
      </PageContainer>
    </ModelsContextProvider>
  );
};

export default Platforms;
