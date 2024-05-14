import { Card, Table, TableColumnProps } from 'antd';
import React from 'react';
import { useRequest } from '@umijs/max';
import { getRankSearch } from '@/services/admin/analysis';

const TopSearch = () => {
  const columns: TableColumnProps<any>[] = [
    {
      title: '排名',
      dataIndex: 'index',
      key: 'index',
      render: (_t, _r, index) => index + 1,
    },
    {
      title: '搜索关键词',
      dataIndex: 'search',
      key: 'search',
      // render: (text: React.ReactNode) => <a href="/">{text}</a>,
    },
    {
      title: '搜索数',
      dataIndex: 'count',
      key: 'count',
      sorter: (
        a: {
          count: number;
        },
        b: {
          count: number;
        },
      ) => a.count - b.count,
    },
    {
      title: '用户数',
      dataIndex: 'user_count',
      key: 'user_count',
    },
    // {
    //   title: '周涨幅',
    //   dataIndex: 'range',
    //   key: 'range',
    //   sorter: (
    //     a: {
    //       range: number;
    //     },
    //     b: {
    //       range: number;
    //     },
    //   ) => a.range - b.range,
    //   render: (
    //     text: React.ReactNode,
    //     record: {
    //       status: number;
    //     },
    //   ) => (
    //     <Trend flag={record.status === 1 ? 'down' : 'up'}>
    //       <span
    //         style={{
    //           marginRight: 4,
    //         }}
    //       >
    //         {text}%
    //       </span>
    //     </Trend>
    //   ),
    // },
  ];

  const { data, loading } = useRequest(getRankSearch);

  return (
    <Card
      loading={loading}
      bordered={false}
      title="线上热门搜索"
      style={{
        height: '100%',
      }}
    >
      {/* <Row gutter={68}>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                搜索用户数
                <Tooltip title="指标说明">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            gap={8}
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={45}
            axis={false}
            padding={-12}
            style={{ fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)', fillOpacity: 0.4 }}
            data={visitData2}
          />
        </Col>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                人均搜索次数
                <Tooltip title="指标说明">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            total={2.7}
            status="down"
            subTotal={26.2}
            gap={8}
          />
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={45}
            padding={-12}
            style={{ fill: 'linear-gradient(-90deg, white 0%, #6294FA 100%)', fillOpacity: 0.4 }}
            data={visitData2}
            axis={false}
          />
        </Col>
      </Row> */}
      <Table<any>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={data}
        pagination={{
          style: {
            marginBottom: 0,
          },
          pageSize: 6,
        }}
      />
    </Card>
  );
};
export default TopSearch;
