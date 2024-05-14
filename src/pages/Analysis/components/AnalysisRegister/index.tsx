import { getAnalysisRegister } from '@/services/admin/analysis';
import { useRequest } from '@umijs/max';
import { useMemo } from 'react';
import { ChartCard, Field } from '../Charts';
import numeral from 'numeral';
import Trend from '../Trend';
import useStyles from '../../style.style';

export default function AnalysisRegister() {
  const { data, loading } = useRequest(getAnalysisRegister);
  const { styles } = useStyles();

  const compareYesterDay = useMemo(() => {
    if (data) {
      return data?.today_total - data?.yesterday_total;
    }
    return 0;
  }, [data]);

  return (
    <ChartCard
      bordered={false}
      title="总注册量"
      loading={loading}
      total={() => numeral(data?.total ?? 0).format('0,0')}
      footer={
        <Field label="今日注册量" value={`${numeral(data?.today_total ?? 0).format('0,0')}`} />
      }
      contentHeight={46}
    >
      <Trend
        flag={compareYesterDay > 0 ? 'up' : 'down'}
        style={{
          marginRight: 16,
        }}
      >
        较昨日
        <span className={styles.trendText}>{compareYesterDay}</span>
      </Trend>
      <Trend flag={compareYesterDay > 0 ? 'up' : 'down'}>
        日同比昨天
        <span className={styles.trendText}>
          {(compareYesterDay / (data?.yesterday_total || 1)) * 100}%
        </span>
      </Trend>
    </ChartCard>
  );
}
