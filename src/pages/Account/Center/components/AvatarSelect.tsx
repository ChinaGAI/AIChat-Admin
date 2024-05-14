import { Avatar, Space } from 'antd';

interface AvatarSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const AvatarSelect = ({ value, onChange }: AvatarSelectProps) => {
  const avatars = Array.from({ length: 14 }, (_, index) => `/avatars/${index + 1}.png`);
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Avatar src={value} size={150} />
      </div>
      <Space wrap>
        {avatars.map((avatar) => (
          <Avatar
            src={avatar}
            key={avatar}
            size={40}
            onClick={() => onChange?.(avatar)}
            style={{
              cursor: 'pointer',
              border: '2px solid #fff',
              borderColor: avatar === value ? '#1890ff' : '#fff',
            }}
          />
        ))}
      </Space>
    </div>
  );
};

export default AvatarSelect;
