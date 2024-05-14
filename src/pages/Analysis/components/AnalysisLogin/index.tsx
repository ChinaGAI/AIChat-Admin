import { getAnalysisLogin } from '@/services/admin/analysis';
import { useRequest } from '@umijs/max';
import { ChartCard, Field } from '../Charts';
import numeral from 'numeral';
import { Area } from '@ant-design/charts';

export default function AnalysisLogin() {
  const { data, loading } = useRequest(getAnalysisLogin);

  return (
    <ChartCard
      bordered={false}
      title="总登录量"
      loading={loading}
      total={() => numeral(data?.total ?? 0).format('0,0')}
      footer={
        <Field label="今日登录量" value={`${numeral(data?.today_total ?? 0).format('0,0')}`} />
      }
      contentHeight={46}
    >
      <Area
        xField="date"
        yField="today_count"
        shapeField="smooth"
        height={46}
        axis={false}
        style={{
          fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
          fillOpacity: 0.6,
          width: '100%',
        }}
        padding={-20}
        data={data?.list ?? []}
        {...{
          meta: {
            today_count: {
              alias: '今日登录量',
            },
          },
        }}
      />
    </ChartCard>
  );
}
