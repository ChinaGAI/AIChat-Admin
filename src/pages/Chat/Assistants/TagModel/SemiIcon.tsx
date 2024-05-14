import { ModalForm } from '@ant-design/pro-components';
import { IconProps } from '@douyinfe/semi-icons';
import * as Icons from '@douyinfe/semi-icons';
import { Button } from 'antd';
import { keys, omit } from 'lodash';
import { useState } from 'react';

const SemiIcons = omit(Icons, ['default', 'IconProps', 'convertIcon']);

export type SemiIconName = keyof typeof SemiIcons;
type Props = Omit<Omit<IconProps, 'type' | 'svg'>, 'ref'> & React.RefAttributes<HTMLSpanElement>;

const SemiIcon = ({ name, ...props }: { name: SemiIconName } & Props) => {
  const Icon = SemiIcons[name] as React.ForwardRefExoticComponent<Props>;
  if (!Icon) return '-';
  return <Icon {...props} />;
};

export const SemiIconSelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalForm
      title="选择图标"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          icon={
            <SemiIcon name={value as SemiIconName} size="large" style={{ cursor: 'pointer' }} />
          }
        />
      }
    >
      {keys(SemiIcons)
        // stroked icons 排前面
        .sort((a, b) => (a.includes('Stroked') ? 1 : b.includes('Stroked') ? -1 : 0))
        .map((key) => {
          console.log(key);
          return (
            <SemiIcon
              key={key}
              name={key as SemiIconName}
              size="large"
              style={{ cursor: 'pointer', padding: '5px', color: key === value ? '#1890ff' : '' }}
              onClick={() => {
                onChange?.(key);
                setOpen(false);
              }}
            />
          );
        })}
    </ModalForm>
  );
};

export default SemiIcon;
