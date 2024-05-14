import { getAnalysisLike } from '@/services/admin/analysis';
import { useRequest } from '@umijs/max';
import { ChartCard, Field } from '../Charts';
import { Column } from '@ant-design/charts';
import { Space } from 'antd';
import numeral from 'numeral';

export default function AnalysisLike() {
  const { data, loading } = useRequest(getAnalysisLike);

  return (
    <ChartCard
      bordered={false}
      loading={loading}
      title="点赞量"
      footer={
        <Space>
          今日
          <Field label="文章" value={numeral(data?.post_today_total).format('0,0')} />
          <Field label="工具" value={numeral(data?.tool_today_total).format('0,0')} />
          <Field label="评论" value={numeral(data?.comment_today_total).format('0,0')} />
        </Space>
      }
    >
      <Column
        data={[
          { x: '文章', y: data?.post_total },
          { x: '工具', y: data?.tool_total },
          { x: '评论', y: data?.comment_total },
        ]}
        height={88}
        paddingBottom={-20}
        yField="y"
        xField="x"
        axis={false}
      />
    </ChartCard>
  );
}
