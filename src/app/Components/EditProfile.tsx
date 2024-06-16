import React from 'react';
import { useState } from 'react';
import avatar from "../assets/avatar.jpg"
import type { GetProp, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Typography , message , Flex , Upload, Avatar , Input , Space , Radio} from 'antd';

const { TextArea } = Input;

interface EditProfileProps {
  editProfile: boolean;
  setEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const EditProfile: React.FC<EditProfileProps> = ({ editProfile, setEditProfile }) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      footer={null}
      bodyStyle={{ padding: 0 }}
      open={editProfile}
      onCancel={() => setEditProfile(false)}
      style={{ background: 'transparent', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      width="auto"
    >
        <Flex>
            <Typography.Title>Edit Profile</Typography.Title>
    
            <Button>Save</Button>
        </Flex>
        <Flex align='center' justify='center'>
             <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Flex>
        <Space direction='vertical'>
            <Avatar src={avatar.src}></Avatar>
            <Input size="large" placeholder="Name" />
            <Input size="large" placeholder="Email" />
            <TextArea
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
            <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>Personal</Radio>
                <Radio value={2}>Business</Radio>
            </Radio.Group>
        </Space>
    </Modal>
  );
};

export default EditProfile;
