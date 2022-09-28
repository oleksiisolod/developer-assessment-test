import { useState, useEffect } from 'react';

import DataService from '../services/DataService';
import HandsontableService from '../services/HandsontableService';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { columnHeaders, rowsData } from '../customData';

registerAllModules();

function CustomHandsontableWidget() {
    const [settings, setSettings] = useState();

    useEffect(() => {
        const dataService = new DataService(() => ({
            headers: columnHeaders,
            data: rowsData,
        }));
        const heatmapService = new HandsontableService(dataService, {
            heatMinColor: '#fff',
            heatMaxColor: '#f67676',
        });
        const options = heatmapService.buildOptions();

        setSettings(options);
    }, []);

    return <div>{settings && <HotTable settings={settings} width="100%" />}</div>;
}

export default CustomHandsontableWidget;
