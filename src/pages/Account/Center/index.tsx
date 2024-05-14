import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Col, Menu } from 'antd';
import Detail from './components/Detail';
import Setting from './components/Setting';
import { useState } from 'react';
import { RiAccountCircleLine, RiSettings2Line } from '@remixicon/react';

export default () => {
  const [current, setCurrent] = useState('info');

  const menus = [
    {
      label: '个人信息',
      icon: <RiAccountCircleLine size={20} />,
      key: 'info',
      component: <Detail />,
    },
    {
      label: '密码设置',
      icon: <RiSettings2Line size={20} />,
      key: 'password',
      component: <Setting />,
    },
  ];

  const currentMenu = menus.find((menu) => menu.key === current);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <Col span={6}>
          <Menu selectedKeys={[current]} onClick={(e) => setCurrent(e.key)} items={menus}></Menu>
        </Col>
        <ProCard colSpan={18} title={currentMenu?.label}>
          {currentMenu?.component}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
