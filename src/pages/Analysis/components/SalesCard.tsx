import { Line } from '@ant-design/charts';
import { Card, Col, Row, Segmented, Spin, Tabs } from 'antd';
// import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
// import type dayjs from 'dayjs';
import numeral from 'numeral';
import useStyles from '../style.style';
import { useState } from 'react';
// import { getTimeDistance } from '../utils/utils';
import { useRequest } from '@umijs/max';
import { getAnalysisVisitByTime } from '@/services/admin/analysis';

// type RangePickerValue = RangePickerProps<dayjs.Dayjs>['value'];

export type TimeType = 'day' | 'week' | 'month' | 'year';
// const { RangePicker } = DatePicker;

const rankingListData: {
  title: string;
  total: number;
}[] = [];

for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = () => {
  const { styles } = useStyles();
  const [type, setType] = useState<TimeType>('day');
  // const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
  //   getTimeDistance('year'),
  // );
  // const selectDate = (type: TimeType) => {
  //   console.log(getTimeDistance(type));
  //   setType(type);
  //   // setRangePickerValue(getTimeDistance(type));
  // };
  // const handleRangePickerChange = (value: RangePickerValue) => {
  //   setRangePickerValue(value);
  // };
  // const isActive = (type: TimeType) => {
  //   if (!rangePickerValue) {
  //     return '';
  //   }
  //   const value = getTimeDistance(type);
  //   if (!value) {
  //     return '';
  //   }
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0] as dayjs.Dayjs, 'day') &&
  //     rangePickerValue[1].isSame(value[1] as dayjs.Dayjs, 'day')
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  const { data, loading: dataLoading } = useRequest(
    () => {
      return getAnalysisVisitByTime({
        range_time: type,
        // start_time: rangePickerValue?.[0]?.format('YYYY-MM-DD'),
        // end_time: rangePickerValue?.[1]?.format('YYYY-MM-DD'),
      });
    },
    {
      refreshDeps: [type],
      formatResult: ({ data }) => {
        const list: { date: string; group: string; value: number }[] = [];
        data.list?.map((item) => {
          list.push({
            date: item.date,
            group: 'uv',
            value: item.uv_count,
          });
          list.push({
            date: item.date,
            group: '访问量',
            value: item.visit_total,
          });
          return item;
        });
        return {
          ...data,
          list,
        };
      },
    },
  );

  const dateOptions = [
    {
      label: '今日',
      value: 'day',
    },
    {
      label: '本周',
      value: 'week',
    },
    {
      label: '本月',
      value: 'month',
    },
    {
      label: '本年',
      value: 'year',
    },
  ];

  const [rankType, setRankType] = useState<'post_rank' | 'tool_rank'>('tool_rank');

  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <Segmented options={dateOptions} value={type} onChange={setType as any}></Segmented>
              </div>
              {/* <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{
                  width: 256,
                }}
              /> */}
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
          items={[
            {
              key: 'views',
              label: '访问量',
              children: (
                <Spin spinning={dataLoading}>
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Line
                          height={420}
                          data={data?.list || []}
                          xField="date"
                          yField="value"
                          group
                          colorField="group"
                          seriesField="group"
                          paddingBottom={12}
                          tooltip={{
                            name: '访问量',
                            channel: 'y',
                          }}
                        />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <h4 className={styles.rankingTitle}>
                          <Segmented
                            options={['工具', '文章']}
                            onChange={(value) => {
                              setRankType(value === '工具' ? 'tool_rank' : 'post_rank');
                            }}
                          ></Segmented>
                        </h4>
                        <ul className={styles.rankingList}>
                          {data?.[rankType]?.map((item, i) => (
                            <li key={i}>
                              <span
                                className={`${
                                  i < 3 ? styles.rankingItemNumberActive : styles.rankingItemNumber
                                }`}
                              >
                                {i + 1}
                              </span>
                              <a
                                className={styles.rankingItemTitle}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.title}
                              </a>
                              <span>{numeral(item.count).format('0,0')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Spin>
              ),
            },
          ]}
        />
      </div>
    </Card>
  );
};
export default SalesCard;
