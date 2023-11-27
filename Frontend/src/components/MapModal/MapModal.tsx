import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { CoordinateProps } from '../../interface/interface';
import CoordinateMap from './CoordinateMap';

const MapModal = ({
  selectedCoor,
  setSelectedCoor,
}: {
  selectedCoor: CoordinateProps | null;
  setSelectedCoor: React.Dispatch<React.SetStateAction<CoordinateProps | null>>;
}) => {
  console.log(selectedCoor);
  const [isModal, setIsModal] = useState(false);
  const showModal = () => {
    setIsModal(true);
  };
  const handleOk = () => {
    setIsModal(false);
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Map
      </Button>
      <Modal title="Select Map Location" open={isModal} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <CoordinateMap
          isModel={isModal}
          setIsModel={setIsModal}
          selectedCoor={selectedCoor}
          setSelectedCoor={setSelectedCoor}
        />
      </Modal>
    </>
  );
};

export default MapModal;
