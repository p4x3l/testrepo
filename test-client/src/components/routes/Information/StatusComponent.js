import React from 'react';
import { Line } from 'react-chartjs';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import menuItems from './menuItems';
import './StatusComponent.css';

import { lineChartData } from '../../../mock/ChartData';

const StatusComponent = () => (
  <AppContentComponent menuItems={menuItems}>
    <div>Information/Status route</div>
    <div className="chart-container">
      <Line data={lineChartData} width="600"  height="250" />
    </div>
  </AppContentComponent>
);

export default StatusComponent;
