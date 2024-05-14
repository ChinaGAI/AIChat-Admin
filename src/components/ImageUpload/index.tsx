import { request } from '@/app';
import { Button, Input, Space, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';
import styles from './style.less';
import { RiUploadCloudFill } from '@remixicon/react';
import { postUploadImage } from '@/services/admin/upload';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  width?: number;
  height?: number;
  round?: boolean;
}

const ImageUpload = ({ value, onChange, width = 80, height = 80, round }: Props) => {
  const [url, setUrl] = useState(value);

  const onFileChange: UploadProps['onChange'] = (info) => {
    const { file, fileList } = info;
    console.log(file, fileList);
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
    if (file.status === 'done') {
      const { response } = file;
      if (response.code !== 200) {
        file.status = 'error';
        message.error(`${file.name} 上传出错`);
        return;
      }
      setUrl(response.data.url);
      onChange?.(response.data.url);
      message.success(`${file.name} 上传成功`);
    } else if (file.status === 'error') {
      message.error(`${file.name} 上传出错`);
    }
  };

  return (
    <>
      <Upload
        showUploadList={false}
        onChange={onFileChange}
        action={request.baseURL + '/upload/image'}
        accept="image/*"
      >
        <div
          className={styles.upload}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: round ? '50%' : '6px',
          }}
        >
          {url ? <img src={url} alt="avatar" className={styles.image} /> : <RiUploadCloudFill />}
        </div>
      </Upload>
    </>
  );
};

export const ImageUploadByUrl = ({ value, onChange, width = 80, height = 80, round }: any) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!imageUrl) {
      message.error('请输入图片地址');
      return;
    }
    setLoading(true);
    const response = await fetch(imageUrl.replace('https://ai-bot.cn', ''));
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    try {
      const { data } = await postUploadImage({ file });
      if (onChange) {
        onChange(data.url);
      }
    } catch (e) {}
    setLoading(false);
  };

  return (
    <>
      <div
        className={styles.upload}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: round ? '50%' : '6px',
          marginBottom: '10px',
        }}
      >
        <img src={value} alt="avatar" className={styles.image} />
      </div>
      <Space>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Button onClick={handleUpload} loading={loading} type="primary">
          上传
        </Button>
      </Space>
    </>
  );
};

export default ImageUpload;
