import React from 'react';
import { Bar, Radar, PolarArea, Pie, Doughnut } from 'react-chartjs';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import menuItems from './menuItems';
import './ReportsComponent.css';

import { lineChartData, polarChartData } from '../../../mock/ChartData';

const ReportsComponent = () => (
  <AppContentComponent menuItems={menuItems}>
    <div>Information/Reports route</div>
    <div className="chart-container">
      <Bar data={lineChartData} width="600" height="250" />
    </div>
    <div className="chart-container">
      <Radar data={lineChartData} width="600" height="250" />
    </div>
    <div className="chart-container">
      <PolarArea data={polarChartData} width="600" height="250" />
    </div>
    <div className="chart-container">
      <Pie data={polarChartData} width="600" height="250" />
    </div>
    <div className="chart-container">
      <Doughnut data={polarChartData} width="600" height="250" />
    </div>
  </AppContentComponent>
);

export default ReportsComponent;
