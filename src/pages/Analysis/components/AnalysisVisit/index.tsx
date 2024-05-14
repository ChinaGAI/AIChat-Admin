import { getAnalysisVisit } from '@/services/admin/analysis';
import { useRequest } from '@umijs/max';
import { PropsWithChildren, useMemo } from 'react';
import { ChartCard, Field } from '../Charts';
import { Progress, Space } from 'antd';
import numeral from 'numeral';
import styles from './style.less';

const SuperUnit = ({ unit, children }: PropsWithChildren<{ unit: string }>) => {
  return (
    <span>
      {children} <span className={styles.unit}>{unit}</span>
    </span>
  );
};

export default function AnalysisVisit() {
  const { data, loading } = useRequest(getAnalysisVisit);

  const percent = useMemo(() => {
    if (data) {
      return Math.ceil((data.uv_total / data.pv_total) * 100);
    }
    return 0;
  }, [data]);

  return (
    <ChartCard
      bordered={false}
      loading={loading}
      title="访问量"
      total={
        <div>
          <SuperUnit unit="PV">{numeral(data?.pv_total).format('0,0')}</SuperUnit>
          <SuperUnit unit="UV">{numeral(data?.uv_total).format('0,0')}</SuperUnit>
        </div>
      }
      footer={
        <Space>
          <Field label="PV日访问量" value={numeral(data?.pv_today_total).format('0,0')} />
          <Field label="UV日访问量" value={numeral(data?.uv_today_total).format('0,0')} />
        </Space>
      }
      contentHeight={46}
    >
      <span style={{ fontSize: '12px', marginRight: '10px' }}>UV占比</span>
      <Progress percent={percent} steps={10} status="active" />
    </ChartCard>
  );
}
