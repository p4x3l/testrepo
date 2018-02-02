import React from 'react';

import AppContentComponent from '../../AppContentComponent/AppContentComponent';
import menuItems from './menuItems';

const SchedulesComponent = () => (
  <AppContentComponent menuItems={menuItems}>
    <div>
      Configuration/Schedule route
    </div>
  </AppContentComponent>
);

export default SchedulesComponent;
