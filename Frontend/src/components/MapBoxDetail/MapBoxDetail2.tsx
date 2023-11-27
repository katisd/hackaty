import { Card, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { MapDataLocationProps } from '../../interface/interface';
import AcceptBox from '../AcceptBox';
import StatusBox from '../StatusBox';
import VoteBox from '../VoteBox';
import './MapBoxDetail.css';

function TagBox({ text }: { text: string }) {
  const style = {
    width: '46px',
    height: '22px',
    padding: '1px 8px',
    borderRadius: '2px',
    gap: '3px',
    background: 'linear-gradient(0deg, #FDFDDB, #FDFDDB),linear-gradient(0deg, #FCFBB1, #FCFBB1)',
    border: '1px solid rgba(252, 251, 177, 1)',
    // Add any additional styling like font size, color, etc.
  };
  return <div style={style}>{text}</div>;
}
function MapBoxDetail2({ selected }: { selected: MapDataLocationProps | null }) {
  const lst_tag = ['tag1', 'tag2', 'tag3'];
  return (
    <div className="map_box_container">
      <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontWeight: 'bold' }}>ฟุตบาตไม่เสมอ</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {lst_tag.map((item) => {
            return <TagBox text={item} />;
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            wordWrap: 'break-word',
          }}
        ></div>
      </div>
      <VoteBox data={selected} />
    </div>
  );
}

export function MapBoxDetailAdmin({
  data,
  setSelected,
}: {
  data: MapDataLocationProps | null;
  setSelected: React.Dispatch<React.SetStateAction<MapDataLocationProps | null>>;
}) {
  const [tags, setTags] = useState(['อุบัติเหตุ', 'แจ้งเตือน']);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const renderVariantCard = (status: string | undefined) => {
    switch (status) {
      case 'Inbox':
        return (
          <>
            <AcceptBox data={data!} />
          </>
        );
      case 'Approved':
        return (
          <>
            <StatusBox data={data!} />
          </>
        );
      case 'Rejected':
        return (
          <>
            <StatusBox data={data!} />
          </>
        );
      case 'Archive':
        return (
          <>
            <StatusBox data={data!} />
          </>
        );
      default:
        return (
          <>
            <p>Something went wrong!</p>
          </>
        );
    }
  };
  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable={false}
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);
  return (
    <>
      <Card
        style={{ marginTop: '16px', marginBottom: '16px', display: 'flex', alignContent: 'center' }}
        onClick={() => {
          setSelected(data);
          console.log(data);
        }}
      >
        <img
          src={
            data?.photo_url ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96cmVJnAqOtv-ps5qnH-62RLVBh_ULqMD4PmBh1J6n7FTxlc7o4ZowyZT3C5v8Np_DKU&usqp=CAU'
          }
          alt=""
          style={{ height: '80px', width: '80px' }}
        />
        <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography style={{ fontWeight: 'bold' }}>{data?.title}</Typography>
          <div style={{ marginBottom: 16 }}>{tagChild}</div>
          <Typography style={{ fontWeight: 'bold' }}>{data?.description}</Typography>
        </div>
        {renderVariantCard(data?.report_status)}
      </Card>
    </>
  );
}

export default MapBoxDetail2;
