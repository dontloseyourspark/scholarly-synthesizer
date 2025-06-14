
import React from 'react';
import ConsensusChart from '@/components/common/ConsensusChart';

const consensusData = [
  { name: 'Support', value: 97, color: '#4CAF50' },
  { name: 'Against', value: 3, color: '#F44336' }
];

const description = [
  "Multiple studies published in peer-reviewed scientific journals show that 97% or more of actively publishing climate scientists agree that climate-warming trends over the past century are extremely likely due to human activities.",
  "This consensus is supported by scientific academies and societies worldwide. A small number of scientists disagree with the consensus position, but the vast majority of climate scientists have concluded that human-caused climate change is happening."
];

const ConsensusTab = () => {
  return (
    <ConsensusChart
      title="Scientific Consensus on Climate Change"
      data={consensusData}
      description={description}
      source="Surveys of scientists and major scientific organizations"
    />
  );
};

export default ConsensusTab;
