import { Dot } from '@antv/l7plot';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import { useRequest } from '@umijs/max';
import { getAnalysisPosition } from '@/services/admin/analysis';
import { useUnmount } from 'ahooks';

export default function CityArea() {
  const ref = useRef(null);
  const dotMap = useRef<Dot | null>(null);

  const { data } = useRequest(getAnalysisPosition, {
    formatResult: ({ data }) => {
      return data.province.map((item) => {
        const xy = item.xy.split(',');
        return {
          ...item,
          lat: xy[0],
          lng: xy[1],
        };
      });
    },
  });

  useEffect(() => {
    if (!ref.current) return;
    if (dotMap.current) return dotMap.current.changeData(data);
    dotMap.current = new Dot(ref.current, {
      map: {
        type: 'amap',
        style: 'dark',
        center: [102.447303, 37.753574],
        zoom: 3,
        pitch: 0,
        token: 'cf07503acc9499bef540d757f50aae77',
      },
      source: {
        data,
        parser: { type: 'json', x: 'lng', y: 'lat' },
      },
      size: {
        field: 'count',
        value: [18, 20],
      },
      style: {
        opacity: 0.5,
        strokeWidth: 0,
      },
      state: { active: { color: '#FFF684' } },
      autoFit: true,
      label: {
        visible: false, // 是否显示标签图层
        field: 'count',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
          textAnchor: 'top', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
          textOffset: [0, 20], // 文本相对锚点的偏移量 [水平, 垂直]
          spacing: 1, // 字符间距
          padding: [5, 5], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
          stroke: '#ffffff', // 描边颜色
          strokeWidth: 0.3, // 描边宽度
          strokeOpacity: 1.0,
        },
      },
      tooltip: {
        items: [
          {
            field: 'province',
            alias: '省份',
          },
          {
            field: 'count',
            alias: '访问量',
          },
        ],
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      legend: {
        position: 'bottomleft',
      },
    });
  }, [data]);

  useUnmount(() => {
    dotMap.current?.destroy();
  });
  return (
    <Card
      title="访问位置分布"
      style={{
        marginTop: 24,
      }}
    >
      <div
        ref={ref}
        style={{
          height: '500px',
        }}
      ></div>
    </Card>
  );
}
