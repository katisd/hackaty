import { Button, Radio, RadioChangeEvent, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { MapDataLocationProps } from '../interface/interface';

const { Paragraph } = Typography;

const ReportDetailed = ({
  data,
  setData,
}: {
  data: MapDataLocationProps | null;
  setData: React.Dispatch<React.SetStateAction<MapDataLocationProps | null>>;
}) => {
  console.log('current data', data);
  const [reportType, setReportType] = useState('');
  const handleReportOnChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setReportType(e.target.value);
  };

  const handleUpdate = async (status: string) => {
    await axios
      .put('https://hackaty.onrender.com/api/report/update', {
        user: 'admin',
        report_id: data?._id,
        report_status: status,
        priority: reportType,
      })
      .then((res) => {
        console.log('Update Status', res.data);
        window.location.href = '/sos-admin';
      });
  };

  const renderCase = (reportStatus: string | undefined) => {
    console.log(reportStatus);
    switch (reportStatus) {
      case 'Inbox':
        return (
          <>
            <Button type="primary" onClick={() => handleUpdate('Approved')} value="Approved">
              Accept Report
            </Button>
            <Button type="primary" onClick={() => handleUpdate('Rejected')} style={{}} value="Rejected">
              Reject Report
            </Button>
          </>
        );
      case 'Approved':
        return (
          <>
            <Button type="primary" onClick={() => handleUpdate('Archive')} value="Archive">
              Archive Report
            </Button>
            <Button type="primary" onClick={() => handleUpdate('Inbox')} style={{}} value="Inbox">
              Move to Inbox
            </Button>
          </>
        );
      case 'Archive':
        return (
          <>
            <Button type="primary" onClick={() => handleUpdate('Inbox')} style={{}} value="Inbox">
              Move to Inbox
            </Button>
          </>
        );
      case 'Rejected':
        return (
          <>
            <Button type="primary" onClick={() => handleUpdate('Inbox')} style={{}} value="Inbox">
              Move to Inbox
            </Button>
          </>
        );
      default:
        return (
          <>
            <p>Something Went Wrong!</p>
          </>
        );
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     getReport()
  //   }, 4000);
  // }, [])

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setData(null);
        }}
      >
        Back
      </Button>
      <div>
        <Paragraph style={{ marginTop: '20px', display: 'flex' }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {data?.title}
          </Typography.Title>
        </Paragraph>
        <Paragraph style={{ marginTop: '20px' }}>{data?.description}</Paragraph>
        <div style={{ display: 'flex', marginBottom: '20px', gap: '21px' }}>
          <Typography>Report Type:</Typography>
          <Radio.Group defaultValue={data?.priority}>
            <Radio.Button value="Report" onChange={handleReportOnChange}>
              Report
            </Radio.Button>
            <Radio.Button value="Warning" onChange={handleReportOnChange}>
              Warning
            </Radio.Button>
            <Radio.Button value="Danger" onChange={handleReportOnChange}>
              Danger
            </Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {renderCase(data?.report_status)}
          {data?.report_status}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailed;
