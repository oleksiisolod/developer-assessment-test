import { useState, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsReact from 'highcharts-react-official';
import DataService from '../services/DataService';
import HighchartService from '../services/HighchartService';
import { columnHeaders, rowsData } from '../customData';

HighchartsHeatmap(Highcharts);

function CustomHighchartsWidget() {
    const [options, setOptions] = useState();

    useEffect(() => {
        const dataService = new DataService(() => ({
            headers: columnHeaders,
            data: rowsData,
        }));

        const heatmapService = new HighchartService(dataService, {
            heatMinColor: '#fff',
            heatMaxColor: '#f67676',
        });

        const opt = heatmapService.buildOptions();
        setOptions(opt);
    }, []);

    return <div>{options && <HighchartsReact highcharts={Highcharts} options={options} />}</div>;
}

export default CustomHighchartsWidget;
