import { getChatModelsList } from '@/services/admin/models';
import { useRequest } from '@umijs/max';
import { useControllableValue } from 'ahooks';
import { createContext, PropsWithChildren, useContext } from 'react';

type ModelsContextType = {
  models: API.ChatModel[];
  mutate: any;
};

// 创建一个 Context
const ModelsContext = createContext<ModelsContextType>({
  models: [],
  mutate: () => {},
});

// 创建一个 Provider 组件
const ModelsContextProvider = ({ children }: PropsWithChildren) => {
  const { data: models, mutate } = useRequest(getChatModelsList, {
    formatResult: (res) => res.data.list,
  });

  return (
    <ModelsContext.Provider value={{ models: models || [], mutate }}>
      {children}
    </ModelsContext.Provider>
  );
};

// 创建一个自定义 Hook
const useModels = (platform: string) => {
  const context = useContext(ModelsContext);
  if (context === undefined) {
    throw new Error('useModels must be used within a ModelsContextProvider');
  }

  const [models, setModels] = useControllableValue({
    value: context.models.filter((model) => model.key_id === platform),
    onChange: (data) => {
      context.mutate([...data, ...context.models.filter((model) => model.key_id !== platform)]);
    },
  });

  return {
    models,
    mutate: setModels,
  };
};

export { ModelsContextProvider, useModels };
