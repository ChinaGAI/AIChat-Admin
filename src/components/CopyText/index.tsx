import { Typography } from 'antd';

export default ({ text }: { text: string }) => {
  return <Typography.Paragraph copyable={{ text }}>{text}</Typography.Paragraph>;
};
