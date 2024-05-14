import { GridContent } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import type { FC } from 'react';
import { Suspense } from 'react';
import IntroduceRow from './components/IntroduceRow';
import PageLoading from './components/PageLoading';
import ProportionSales from './components/ProportionSales';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import type { AnalysisData } from './data.d';
import CityArea from './components/CityArea';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};
const Analysis: FC<AnalysisProps> = () => {
  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow />
        </Suspense>

        <Suspense fallback={null}>
          <SalesCard />
        </Suspense>

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales />
            </Suspense>
          </Col>
        </Row>

        {/* <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense> */}
      </>
      <CityArea />
    </GridContent>
  );
};
export default Analysis;
