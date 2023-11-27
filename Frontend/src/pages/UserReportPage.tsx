import { LeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapModal from '../components/MapModal/MapModal';
import { CoordinateProps } from '../interface/interface';
import StudentLayout from '../modules/common/StudentLayout';
import { GetTags, NisitPostReport } from '../service/api';
import './UserReportPage.css';

type NameObject = {
  name: string;
};
type UserFormProps = {
  title: string;
  tags: string[];
  place: string;
  description: string;
};
type TagObject = {
  label: string;
  value: string;
};
const convertToTagApi = (arr: string[]): NameObject[] => {
  return arr.map((item) => ({ name: item }));
};
const convertToSelector = (arr: NameObject[]): TagObject[] => {
  console.log(arr);
  return arr.map((item) => ({
    label: item.name,
    value: item.name,
  }));
};
function UserReportPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<UserFormProps>();
  const [selectedCoordinate, setSelectedCoordinate] = useState<CoordinateProps | null>(null);
  const [tags, setTags] = useState<TagObject[]>([]);
  const onSend = async () => {
    console.log(form.getFieldsValue());
    const data = {
      ...form.getFieldsValue(),
      lat: selectedCoordinate?.lat,
      lon: selectedCoordinate?.lng,
      user: 'hackaty',
    };
    const new_data = { ...data, tags: convertToTagApi(data.tags) };
    const res = await NisitPostReport(new_data);
    if (res) {
      console.log(res);
      navigate('/alert-map');
      window.location.reload();
    }
  };
  useEffect(() => {
    const getTags = async () => {
      const res = await GetTags();
      if (res) {
        // console.log(res.data)
        const tags = convertToSelector(res.data.all_tag);
        setTags(tags);
      }
    };
    getTags();
  }, []);
  return (
    <StudentLayout>
      <div style={{ backgroundColor: '#f4f4f4', height: '100vh' }}>
        <div className="header" style={{ position: 'relative' }}>
          <Button
            size="large"
            shape="circle"
            style={{ position: 'absolute', left: '20px' }}
            icon={<LeftOutlined />}
            onClick={() => {
              window.history.back();
            }}
          />
          <Typography.Title level={3} style={{ color: 'white' }}>
            ส่งคำร้องเรียน
          </Typography.Title>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <Form form={form} layout="vertical" autoComplete="off" onFinish={onSend}>
            <Form.Item
              rules={[{ required: true, message: 'Please input your title' }]}
              name="title"
              label="คำร้องเรียน"
            >
              <Input />
            </Form.Item>

            <Form.Item name="picUrl" label="url รูปภาพ">
              <Input />
            </Form.Item>

            <Form.Item name="tags" label="tags">
              <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" options={tags} />
            </Form.Item>
            <Form.Item style={{}} name="place" label="สถานที่">
              <Input
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                value={!selectedCoordinate ? '' : selectedCoordinate?.lat + ',' + selectedCoordinate?.lng}
              />
              <MapModal selectedCoor={selectedCoordinate} setSelectedCoor={setSelectedCoordinate} />
            </Form.Item>
            <Form.Item name="description" label="รายละเอียด">
              <Input.TextArea rows={4} maxLength={100} name="description" />
            </Form.Item>
            <Typography.Text type="secondary">
              *หมายเหตุจะมีการบันทึกชื่อของผู้ส่งคำร้อง เมื่อผ่านการพิจารณา คำร้องเรียนของท่านจะถูกประกาศผ่านแอปนิสิต
              ใช้เวลาประมาณ 24 ชั่วโมง
            </Typography.Text>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{
                  maxWidth: '315px',
                  width: '100%',
                  left: '50%',
                  transform: 'translate(-50%,0)',
                }}
              >
                ส่งคำร้อง
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </StudentLayout>
  );
}

export default UserReportPage;
