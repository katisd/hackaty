import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import { MapDataLocationProps } from '../interface/interface';
function VoteBox({ data }: { data: MapDataLocationProps | null }) {
  const vote = (isUp: boolean) => {
    console.log(data);
    axios.put('https://hackaty.onrender.com/api/report/update_vote_score', {
      report_id: data?._id,
      isUp: isUp,
      user: 'nisit',
    });
  };
  return (
    <div
      style={{ gap: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <Button onClick={() => vote(true)} shape="circle" style={{ margin: '8px' }} icon={<UpOutlined />} size="large" />
      <div style={{ gap: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '14px', color: 'var(--primary-206, #030B0B)' }}>{data?.vote_score}</div>
        <div style={{ fontSize: '12px', color: '#BFBFBF' }}>คำร้อง</div>
      </div>
      <Button
        onClick={() => vote(false)}
        shape="circle"
        style={{ margin: '8px' }}
        icon={<DownOutlined />}
        size="large"
      />
    </div>
  );
}
export default VoteBox;
