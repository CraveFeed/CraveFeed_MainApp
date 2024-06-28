import React from 'react';
import { useState } from 'react';
import avatar from "../assets/avatar.jpg"
import type { GetProp, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/lib/hooks';
import { editProfileCall } from '@/lib/features/services/getProfile';
import { Button, Modal, Typography , message , Flex , Upload, Avatar , Input , Space , Radio} from 'antd';
import "../styles/profile.css"

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
  const [bio, setBio] = useState<string>("");
  const [ firstname , setfirstname] = useState<string>("");
  const [lastname, setlastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  
  const dispatch = useAppDispatch();
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBio(e.target.value);
    console.log('Change:', e.target.value);
  };

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
      {loading ? <LoadingOutlined style={{color : "white"}} /> : <PlusOutlined style={{color : "white"}} />}
      <div style={{ marginTop: 8 , color : "whitesmoke" , fontSize : "12px" }}>Upload Cover Image</div>
    </button>
  );

  return (
    <Modal
      footer={null}
      bodyStyle={{ padding: 0 }}
      open={editProfile}
      onCancel={() => setEditProfile(false)}
      style={{ background: 'transparent', display : "flex" , alignContent : "center" , justifyContent : "center"  , padding: 0, margin: 0,  alignItems: 'center' }}
      className='profile-edit-modal'
      width="auto"
    >
        <div className='profile-edit-modal-mainDiv' style={{ backgroundColor : "#1B2730" }}>
            <Flex className='edit-profile-flex'>
                <Typography.Title className='edit-profile-title' style={{ color : "#c7c7c7" }}>Edit Profile</Typography.Title>
                <Button className='edit-profile-save-btn' style={{ width : "5vw" , border : "none" , borderRadius : "15px" , color : "#c7c7c7" , backgroundColor : "#051017"}} onClick={() => {
                    setEditProfile(false)
                    dispatch(editProfileCall({ userId: "2", bio: bio, firstname: firstname, lastname: lastname, tag: 'Personal' }))
                    }}>Save</Button>
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
            <Space direction='vertical' style={{ display : "flex" , alignContent : "center" , justifyContent  : "center" , alignItems : "flex-start" }}>
                <Flex>
                    <Upload
                        name="avatar"
                        style={{ width : "2px" , height : "2px" }}
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <Avatar src={avatar.src} style={{ width : "7vh" , height : "7vh"}}></Avatar>}
                    </Upload>
                </Flex>
                <Input className="profile-custom-input" onChange={(e) => { setfirstname(e.target.value)}} style={{ backgroundColor: "#051017", color: "whitesmoke", border: "none" , width : "400px" }} size="large" placeholder="First Name" />
                <Input className="profile-custom-input" onChange={(e) => { setlastname(e.target.value)}} style={{ backgroundColor: "#051017", color: "whitesmoke", border: "none" , width : "400px" }} size="large" placeholder="Last Name" />
                <Input className="profile-custom-input" onChange={(e) => { setEmail(e.target.value)}} style={{ backgroundColor: "#051017", color: "whitesmoke", border: "none" , width : "400px"}} size="large" placeholder="Email" />
                <TextArea 
                  showCount
                  maxLength={200}
                  onChange={onChange}
                  placeholder="Your bio"
                  className="profile-custom-textarea"
                  style={{ backgroundColor: "#051017", color: "whitesmoke", border: "none" , width : "400px"}}
                />
                <Flex align='center' justify='center' style={{ width : "400px"}}>
                  <Radio.Group name="radiogroup" defaultValue={1} style={{ display : "flex" , alignContent : "center" , justifyContent : "center"}}>
                      <Radio className='profile-radio-btn' style={{ color : "white" }} value={1}>Personal</Radio>
                      <Radio className='profile-radio-btn' style={{ color : "white" }} value={2}>Business</Radio>
                  </Radio.Group>
                </Flex>
            </Space>
            <Flex className='edit-profile-save-btn-500px-div' align='center' justify='center'>
              <Space size="large">
                  <Button className='edit-profile-save-btn-500px' onClick={() => {
                    setEditProfile(false)
                    dispatch(editProfileCall({ userId: "2", bio: bio, firstname: firstname, lastname: lastname, tag: 'Personal' }))
                    }}>Save</Button>
                  <Button className='edit-profile-save-btn-500px' onClick={() => setEditProfile(false)}>Close</Button>
              </Space>
            </Flex>
        </div>
    </Modal>
  );
};

export default EditProfile;
