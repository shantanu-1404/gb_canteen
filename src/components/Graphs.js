import React from 'react';
import UTMTrackingChart from '../components/UTMTrackingChart';
import AudienceDemographics from "../components/AudienceDemographics"
import LoadTimeChart from "../components/LoadTimeChart"

const App = () => {
  return (
    <div className='row'>
      <h1 style={{ textAlign: 'center' }}>Social Media UTM Tracking</h1>
      <UTMTrackingChart />
      <AudienceDemographics />
    

    <div>
        <LoadTimeChart />
    </div>
    </div>
  );
};

export default App;
