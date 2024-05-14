import { Pie } from '@ant-design/charts';
import { Card } from 'antd';
import numeral from 'numeral';
import React from 'react';
import useStyles from '../style.style';
import { useRequest } from '@umijs/max';
import { getAnalysisDevice } from '@/services/admin/analysis';

const ProportionSales = () => {
  const { styles } = useStyles();
  const { data, loading } = useRequest(getAnalysisDevice);
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="访问设备分布"
      style={{
        height: '100%',
      }}
    >
      <div>
        <Pie
          height={330}
          radius={0.8}
          paddingBottom={-20}
          angleField="count"
          colorField="os"
          data={data}
          legend={false}
          label={{
            position: 'spider',
            lineHeight: 30,
            transform: [
              {
                type: 'overlapDodgeY',
              },
            ],
            text: (item: { os: string; count: number }) => {
              return `${item.os}: ${numeral(item.count).format('0,0')}`;
            },
          }}
        />
      </div>
    </Card>
  );
};
export default ProportionSales;
